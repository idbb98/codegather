# EFCore基本使用

### NuGet包

- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Relational

### 控制台程序中使用

```csharp
//第一步：创建实体类
//Book.cs
public class Book
{
    public long Id { get; set; }
    public string? Title { get; set; }
    public DateTime PubTime { get; set; }
    public double Price { get; set; }
    public string? AuthorName { get; set; }
}

//第二步：创建实体配置类，配置实体与数据表的映射关系
//BookConfig.cs
public class BookConfig : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("T_Books");
        builder.Property(x => x.Title).HasMaxLength(50).IsRequired();
        builder.Property(x => x.AuthorName).HasMaxLength(20).IsRequired();
    }
}

//第三步：创建DbContext的子类
public class TestDbContext: DbContext
{
    public DbSet<Book> Books { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string connStr = "Data Source=(localdb)\\\\MSSQLLocalDB;Initial Catalog=EFCoreDemo;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        optionsBuilder.UseSqlServer(connStr);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
    }
}

// 数据迁移:先后执行Add-Migration init和Update-database命令
// 第四步：创建DbContext对象，通过ORM操作数据库，进行增删改查。Program.cs
// 因为DbContext类实现了IDisposable接口，所以使用using
using var ctx = new TestDbContext();

//新增
var b1 = new Book
{
    Title = "书名1",
    AuthorName = "作者1",
    Price = 59.8,
    PubTime = new DateTime(2019, 3, 1)
};
var b2 = new Book
{
    Title = "书名2",
    AuthorName = "作者2",
    Price = 49.8,
    PubTime = new DateTime(2005, 3, 1)
};
var b3 = new Book
{
    Title = "书名3",
    AuthorName = "作者3",
    Price = 39.8,
    PubTime = new DateTime(2010, 3, 1)
};
ctx.Books.Add(b1);
ctx.Books.Add(b2);
ctx.Books.Add(b3);
await ctx.SaveChangesAsync();

//查询
foreach (var b1 in ctx.Books.Where(b => b.Price > 40))
{
    Console.WriteLine($"ID = {b1.Id}, Title = {b1.Title}, author = {b1.AuthorName}, price = {b1.Price}");
}

//修改
var b2 = ctx.Books.Single(b => b.Id == 2);
b2.AuthorName = "作者XX";
await ctx.SaveChangesAsync();

//删除
var b3 = ctx.Books.Single(b => b.Id == 3);
ctx.Books.Remove(b3); //也可以写成ctx.Remove(b3)
await ctx.SaveChangesAsync();
```

> 实体与数据表的映射关系，也可以在DbContext的OnModelCreating方法中配置（见下例）。实际项目中，会使用多DbContext或者微服务，在DbContext中进行映射关系的配置，并不会造成代码太长难读，反而有利于维护，可以选择在DbContext中直接进行配置。


### AspNetCore中使用

```csharp
//创建简单的三层应用：启动层（WebApi）、Domain层（类库）、EFCore层（类库）
//三层引用关系：启动层引用Domain层和EFCore层、EFCore层引用Domain层

//第一步：在Domain层创建Book实体
//Book.cs
public class Book
{
    public long Id { get; set; }
    public string? Title { get; set; }
    public DateTime PubTime { get; set; }
    public double Price { get; set; }
    public string? AuthorName { get; set; }
}

//第二步：在EFCore层创建DbContext，配置映射关系
//BookStoreDbContext.cs
public class BookStoreDbContext: DbContext
{
    public DbSet<Book> Books { get; set; }

    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options):base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Book>(b => {
            b.ToTable("T_Books");
            b.Property(b => b.Title).HasMaxLength(50).IsRequired();
            b.Property(b => b.AuthorName).HasMaxLength(20).IsRequired();
        });
    }
}

//第三步：启动层注册DbContext服务，并配置数据库连接字符串
//Program.cs
builder.Services.AddDbContext<BookStoreDbContext>(opt =>
        {
            string connStr = builder.Configuration.GetConnectionString("Default");
            opt.UseSqlServer(connStr);
        });

//第四步：在EFCore层创建IDesignTimeDbContextFactory<T>的实现类
//MyDesignTimeDbContextFactory.cs
public class MyDesignTimeDbContextFactory : IDesignTimeDbContextFactory<BookStoreDbContext>
{
    public BookStoreDbContext CreateDbContext(string[] args)
    {
        DbContextOptionsBuilder<BookStoreDbContext> builder = new();
        string connStr = "Data Source=(localdb)\\\\MSSQLLocalDB;Initial Catalog=BookStore;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        builder.UseSqlServer(connStr);
        return new BookStoreDbContext(builder.Options);
    }
}

//第五步：在EFCore层，执行数据迁移，初始化数据库
Add-Migration initBookStore
Update-database

//第六步：在控制器中，以依赖注入的方式使用
......
private readonly BookStoreDbContext ctx;
public TestController(BookStoreDbContext  ctx)
{
    this.ctx = ctx;
}
```

> 以依赖注入方式使用BookStoreDbContext，创建的对象，只要实现了IDisposable接口，离开作用域后，容器会自动调用Dispose方法，所以不需要调用Dispose方法，也不需使用using。


> 由于分层原因，DbContext的服务容器和EFCore一般不再同一个层，一般框架如ABP、MASA，针对这种情况，都有相应的解决方法，基础原理也如上所示，EFCore层和启动层，两个地方都要配置数据库连接。

