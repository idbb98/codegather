# CSharp语法

### Solid原则
| SOLID | 原则 |
| --- | --- |
| SRP | 单一责任原则 |
| OCP | 开放封闭原则 |
| LSP | 里氏替换原则 |
| ISP | 接口隔离原则 |
| DIP | 依赖倒置原则 |


- 单一责任原则

指的是一个类或者一个方法只做一件事。如果一个类承担的职责过多，就等于把这些职责耦合在一起，一个职责的变化就可能抑制或者削弱这个类完成其他职责的能力。

- 开放封闭原则

对扩展开放，对修改关闭。意为一个类独立之后就不应该去修改它，而是以扩展的方式适应新需求。例如一开始做了普通计算器程序，突然添加新需求，要再做一个程序员计算器，这时不应该修改普通计算器内部，应该使用面向接口编程，组合实现扩展。

- 里氏替换原则

所有基类出现的地方都可以用派生类替换而不会程序产生错误。子类可以扩展父类的功能，但不能改变父类原有的功能。例如机动车必须有轮胎和发动机，子类宝马和奔驰不应该改写没轮胎或者没发动机。

- 接口隔离原则

类不应该依赖不需要的接口，直到越少越好。例如电话接口只约束接电话和挂电话，不需要让依赖者知道还有通讯录。

- 依赖倒置原则

指的是高级模块不应该依赖低级模块，而是依赖抽象。抽象不能依赖细节，细节要依赖抽象。比如类A内有类B对象，称为类A依赖类B，但是不应该这样做，而是选择类A去依赖抽象。例如垃圾收集器不管垃圾是什么类型，要是垃圾就行。

### 封装

**封装** 被定义为"把一个或多个项目封闭在一个物理的或者逻辑的包中"。在面向对象程序设计方法论中，封装是为了防止对实现细节的访问。

一个 **访问修饰符** 定义了一个类成员的范围和可见性。C# 支持的访问修饰符如下所示：

- public：所有对象都可以访问；
- private：对象本身在对象内部可以访问；
- protected：只有该类对象及其子类对象可以访问；
- internal：同一个程序集的对象可以访问；
- protected internal：访问限于当前程序集或派生自包含类的类型。

如果没有指定访问修饰符，则使用类成员的默认访问修饰符，即为 **private**。

### 可空类型

```
/* C# 可空类型（Nullable）
? 单问号用于对 int、double、bool 等无法直接赋值为 null 的数据类型进行 null 的赋值，意思是这个数据类型是 Nullable 类型的。
?? 双问号用于判断一个变量在为 null 的时候返回一个指定的值。
*/
using System;
public class testNullable
{
   public static void Main(string[] args)
   {
      int? a = null;    // 等价于 Nullable<int> a = new Nullable<int>();
      int b = a ?? 0;
      Console.WriteLine(a);      // 空
      //Console.WriteLine("a's type is {0}",a,a.GetType().FullName);   // NullReferenceException
      Console.WriteLine(b);      // 0
      Console.WriteLine("b's type is {0}",b.GetType().FullName);     // b's type is System.Int32
   }
}
```

### 枚举类型

- 人为限定取值范围的整数
- 整数值的对应

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            Person person = new Person();
            person.Level = Level.Employee;
            Person boss = new Person();
            boss.Level = Level.Boss;

            Console.WriteLine(person.Level>boss.Level); // False
            Console.WriteLine((int)person.Level);   // 100
            Console.WriteLine((int)boss.Level);     // 101
        }
    }

    enum Level { // 枚举Level
        Employee=100,
        Manager=100, // 枚举的成员名不能重复，但是枚举成员的值是可以重复
        Boss,   // 不赋值默认+1
    }

    class Person {
        public int Id { get; set; }
        public string Name { get; set; }

        public Level Level { get; set; }
    }
}
```

- 比特位式用法

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            Person person = new Person();
            person.Level = Level.Employee;
            person.Name = "Jack";
            // 同时拥有4种技能
            person.Skill = Skill.Drive | Skill.Cook | Skill.Program | Skill.Teach;
            Console.WriteLine(person.Skill);    // 15
            // 判断是否拥有Cook技能(2种形式)
            Console.WriteLine( (person.Skill & Skill.Cook) > 0);    // True
            Console.WriteLine( (person.Skill & Skill.Cook) == Skill.Cook); //True
        }
    }

    enum Level { // 枚举Level
        Employee=100,
        Manager=100, // 枚举的成员名不能重复，但是枚举成员的值是可以重复
        Boss,   // 不赋值默认+1
    }

    enum Skill {        // 2进制
        Drive = 1,      // 0001
        Cook = 2,      // 0010
        Program = 4,   // 0100
        Teach = 8,      // 1000
    }

    class Person {
        public int Id { get; set; }
        public string Name { get; set; }

        public Level Level { get; set; }

        public Skill Skill { get; set;}
    }
}
```

### 结构体(Struct)

- 值类型，可装箱/拆箱
- 可实现接口，不能派生自类/结构体
- 不能有显示无参构造器

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            // 结构体是值类型，拷贝的是对象
            Student stu1 = new Student() { Id = 1, Name = "Jack" };
            Student stu2 = stu1;
            stu2.Id = 2;
            stu2.Name = "Tom";
            stu1.Speak();   // #1 Name:Jack.
            stu2.Speak();   // #2 Name:Tom.
            /*
            Student student = new Student() { Id=101,Name="Jack"};
            object obj = student; // 装箱
            Student student2 = (Student)obj; // 拆箱
            student2.Speak();
            */
        }
    }

    interface ISpeak {
        void Speak();
    }

    struct Student:ISpeak {
        public int Id { get; set; }
        public string Name { get; set; }

        public void Speak() {
            Console.WriteLine($"#{this.Id} Name:{this.Name}.");
        }
    }
}
```

### 类(Class)

### 类的成员

1.  构造函数、析构函数
构造函数分为: 实例构造器 和 类型构造器 
2.  常量、字段 
3.  属性、索引器 
4.  方法、事件 
5.  运算符重载 
6.  嵌套类 

```
using System;

intelnal sealed class Test{

     //构造函数
     public Test(){}

     //析构函数
     ~Test(){}

     //常量
     const int x = 123;

     //字段
     public string _aProp;

     //属性
     public string AProp{get; set;}

     //索引器
     public string this[int i]{
         get{ return null; }
         set{}
     }

     //方法
     public void AFunc(string arg){}

     //事件
     event EventHandel AnEvent;

     //操作符重载
     public static bool operator ==(Test t1, Test t2){
         return true;
     }

     //嵌套类
     class Nested{
         Nested() { }
     }
 }
```

```
/* 类
类的默认访问标识符是 internal，成员的默认访问标识符是 private。
*/
using System;
namespace Test
{
   class TestClass
   {
      public static void Main(string[] args)
         {
            People p = new People(20,"Tim");
            People.getPeopleInfo(p);
         }
   }
   class People
      {
         private int age;  // 保持私有来实现封装
         private string name;

         public People(int age,string name)  // 构造函数
         {
            this.age=age;
            this.name=name;
         }
         public static void getPeopleInfo(People people)    // 静态函数
         {
            Console.WriteLine("{0}的年龄:{1}",people.name,people.age);
         }
      }
}
```

### 类继承

**继承**：子类在完整(实例构造器除外)接受父类成员的前提下，进行横向（类成员个数的扩充）或纵向（对类成员的重写）的扩展。

```csharp
<访问修饰符> class <基类>
{
 ...
}
class <派生类> : <基类>
{
 ...
}
```

继承的思想实现了 **是一个（IS-A）** 关系。所以可以用一个基类变量接收其派生类实例。

```csharp
Object o = new Car();
```

使用`sealed`修饰类，则该类不可被继承。

C#中类只能单一继承。

派生类的访问级别不能超过基类。

---

继承链上的类创建时，先执行基类的构造器，再执行派生类的构造器。

```csharp
namespace ClassEx{
    internal class Program{
        static void Main(string[] args) {
            Car car = new Car();    // 先执行基类的构造器（1），再执行派生类的构造器（2）。
            Console.WriteLine(car.Owner);
            car.ShowOwner();
            Console.ReadLine();
        }
    }

    class Vehicle {
        public Vehicle()    // （1）
        {
            this.Owner = "N/A";
        }
        public string Owner { get; set; }
    }

    class Car : Vehicle {
        public Car() {      //（2）
            this.Owner = "Car Owner";
        }

        public void ShowOwner() {
            Console.WriteLine(this.Owner);
            Console.WriteLine(base.Owner); // base 访问上一级基类对象,最多上一级,不存在base.base
            // 此处，由于子类Car继承父类Vehicle的Owner，所以两个语句无区别
            // 若把基类Owner的访问级别改为private,那么base报错。虽然派生类继承了Owner，但无权访问。
        }
    }
}
```

```csharp
namespace ClassEx{
    internal class Program{
        static void Main(string[] args) {
            Car car = new Car("Tom");
            Console.WriteLine(car.Owner);
            car.ShowOwner();
            Console.ReadLine();
        }
    }

    class Vehicle {
        public Vehicle(string owner)   // 只有有参构造
        {
            this.Owner = owner;
        }
        public string Owner { get; set; }
    }

    class Car : Vehicle {
        // 报错原因：Car继承Vehicle,使用派生类无参构造时隐含着调用基类的无参构造
        // public Car() {
        // 解决方案1：使用base调用有参构造方法时传值
        public Car():base("N/A") {
            this.Owner = "Car Owner";
        }
        // 解决方案2：
        public Car(string onwer) : base(onwer) { // 此处可以不用给Owner赋值，因为基类的构造已经赋值

        }

        public void ShowOwner() {
            Console.WriteLine(Owner);
        }
    }
}
```

由以上可知，基类的实例构造器不能被派生类继承。

### 重写和多态

重写的前提：在进行重写时，父类中的这个方法必须是虚拟方法（virtual），派生类重写方法使用override修饰。

```csharp
namespace ClassEx{
    internal class Program{
        static void Main(string[] args) {
            Vehicle v = new RaceCar();
            v.Run();
            Console.ReadLine();
        }
    }

    class Vehicle {
        public virtual void Run() {
            Console.WriteLine("I'm running!");
        }
    }

    class Car : Vehicle {
        public override void Run() {
            Console.WriteLine("Car is runnig!");
        }
    }

    class RaceCar:Car {
        public override void Run() {
            Console.WriteLine("Race Car is running!");
        }
    }
}
```

若无virtual和override，发生隐藏。以下RaceCar类的Run被隐藏，使用Vehicle接受`new RaceCar()`时，调用Run()会找最新版本重写的方法，所以输出`Car is runnig!`。使用RaceCar接受时，调用Run()直接执行（无重写）。

```csharp
namespace ClassEx{
    internal class Program{
        static void Main(string[] args) {
            Vehicle v = new RaseCar();
            v.Run();            // Car is runnig!
            RaseCar raseCar = new RaseCar();
            raseCar.Run();      // Rase Car is running!
            Console.ReadLine();
        }
    }

    class Vehicle {
        public virtual void Run() {
            Console.WriteLine("I'm running!");
        }
    }

    class Car : Vehicle {
        public override void Run() {
            Console.WriteLine("Car is runnig!");
        }
    }

    class RaceCar:Car {
        public void Run() {
            Console.WriteLine("Race Car is running!");
        }
    }
}
```

若想要重写类成员时，访问级别需要为`public`或`protected`。

多态是指不同的子类在继承父类后分别都重写覆盖了父类的方法，即父类同一个方法，在继承的子类中表现出不同的形式。多态成立的另一个条件是在创建子类时候必须使用父类new子类的方式。如使用`Vehicle v = new Car()`
多态存在的三个**必要条件**：继承、重写、父类引用指向子类对象

### 抽象类和开闭原则

抽象类不能被实例化。

具体类 -> 抽象类 -> 接口：越来越抽象，内部实现越来越少。

抽象类是为完全实现逻辑的类（可以有字段和非public成员）。

抽象类为复用而生：专门作为基类使用，也具有解耦功能。

封装确定的，开放不确定的，推迟到合适的子类实现。

### 开闭原则

开放/关闭原则（Open Closed Principle，OCP）。软件实体应当**对扩展开放，对修改关闭**（Software entities should be open for extension，but closed for modification），这就是开闭原则的经典定义。 实现“开-闭”原则的关键步骤就是抽象化 、核心思想就是面向抽象编程。

```csharp
namespace AbstractClassEx {
    internal class Program {
        public static void Main(string[] args) {
            Vehicle v = new Car();
            v.Run();
        }
    }

    abstract class Vehicle {        // 抽象类
        public abstract void Run();

        public void Stop() {
            Console.WriteLine("Stop!");
        }
    }

    class Car : Vehicle {
        public override void Run() {
            Console.WriteLine("Car is running!");
        }
    }
}
```

### partial类

- 减少类的派生（一个类可以分在多个地方写，最终编译合并为一个类）

通过分部类型可以定义要拆分到多个文件中的类、结构或接口。例如，WinForm页面由Ui和后台逻辑部分构成，使用了partial类。分部类型可以包含分部方法。

### 接口(Interface)

接口不能实例化。

接口是完全未实现逻辑的“类”（只有函数成员，成员全部public（不用且不能写出））。

接口为解耦而生。”高内聚，低耦合“，方便单元测试。

```csharp
namespace InterfaceEx {
    internal class Program {
        static void Main(string[] args) {
            var user = new PhoneUser(new NokiaPhone());
            user.UsePhone();
        }
    }

    class PhoneUser {
        private IPhone _phone;

        public PhoneUser(IPhone phone)
        {
            _phone = phone;
        }

        public void UsePhone() {
            _phone.Send();
            _phone.Recive();
        }
    }

    interface IPhone {    // 接口定义
        void Send();
        void Recive();
    }

    class NokiaPhone : IPhone {        //接口实现
        public void Recive() {
            Console.WriteLine("Nokia message ring ...");
        }

        public void Send() {
            Console.WriteLine("Hello!");
        }
    }

    class MiPhone : IPhone {
        public void Recive() {
            Console.WriteLine("Mi message ring ...");
        }

        public void Send() {
            Console.WriteLine("Hello!");
        }
    }
}
```

### 依赖反转原则DIP

依赖倒置原则（Dependence Inversion Principle）是程序要依赖于抽象接口，不要依赖于具体实现。

![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230328205255139-1709007705.png#id=DhrIo&originHeight=729&originWidth=979&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

以下示例为紧耦合：

```csharp
namespace InterfaceEx {
    internal class Program {
        static void Main(string[] args) {
            var fan = new DeskFan(new PowerSupply());
            Console.WriteLine(fan.Work());
            Console.ReadLine();
        }
    }

    class PowerSupply {
        public int GetPower() {
            return 220;
        }
    }

    class DeskFan {
        private PowerSupply _powerSupply;
        public DeskFan(PowerSupply powerSupply)
        {
            _powerSupply = powerSupply;
        }

        public string Work() {
            int power = _powerSupply.GetPower();
            if (power <= 0) {
                return "won't work!";
            }
            else if (power <= 220) {
                return "fine";
            }
            else {
                return "error";
            }

        }
    }
}
```

引入接口：

```
namespace InterfaceEx {
    internal class Program {
        static void Main(string[] args) {
            var fan = new DeskFan(new PowerSupply());
            Console.WriteLine(fan.Work());
            Console.ReadLine();
        }
    }

    public interface IPowerSupply {
        int GetPower();
    }
    public class PowerSupply:IPowerSupply {
        public int GetPower() {
            return 220;
        }
    }

    public class DeskFan {
        private IPowerSupply _powerSupply;
        public DeskFan(IPowerSupply powerSupply)
        {
            _powerSupply = powerSupply;
        }

        public string Work() {
            int power = _powerSupply.GetPower();
            if (power <= 0) {
                return "won't work!";
            }
            else if (power <= 220) {
                return "fine";
            }
            else {
                return "error";
            }

        }
    }
}
```

### 各种方法关系图

![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230328205329506-1144436018.png#id=fC2gm&originHeight=316&originWidth=699&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 接口隔离原则

Interface Segregation Principle（ISP）：表明类不应该被迫依赖他们不使用的方法，也就是说一个接口应该拥有尽可能少的行为，它是精简的，也是单一的。

```
namespace IspEx {
    internal class Program {
        static void Main(string[] args) {
            // 数组和ArrayList实现了IEnumerable和ICollection
            int[] nums1 = {1, 2, 3, 4, 5};
            ArrayList nums2 = new ArrayList { 1, 2, 3, 4, 5 };
            Console.WriteLine(Sum(nums1));
            Console.WriteLine(Sum(nums2));
            // 自定义类ReadOnlyCollection只实现IEnumerable
            var nums3 = new ReadOnlyCollection(nums1);
            foreach (var n in nums3) {
                Console.WriteLine(n);
            }
            Console.WriteLine(Sum(nums3));
            Console.ReadLine();

        }

        /* private static int Sum(ICollection muns)
         * 使用ICollection无法处理Sum(nums3)
         * ICollection除了实现IEnumerable外，还增加了自身几个接口方法
         * 但是自定义类ReadOnlyCollection只实现IEnumerable
         */
        private static int Sum(IEnumerable muns) {
            int sum = 0;
            foreach (var n in muns) {
                sum += (int)n;
            }
            return sum;
        }
    }

    class ReadOnlyCollection : IEnumerable { // 只实现IEnumerable

        private int[] _array;
        public ReadOnlyCollection(int[] array)
        {
            _array = array;
        }
        public IEnumerator GetEnumerator() {
            return new ReadOnlyCollection.Enumerator(this);
        }

        public class Enumerator : IEnumerator {
            private ReadOnlyCollection _collection;
            private int _head;

            public Enumerator(ReadOnlyCollection collection)
            {
                _collection = collection;
                _head = -1;
            }
            public object Current {
                get {
                    object o = _collection._array[_head];
                    return o;
                }
            }

            public bool MoveNext() {
                if(++_head<_collection._array.Length) {
                    return true;
                }else {
                    return false;
                }
            }

            public void Reset() {
                _head = -1;
            }
        }
    }
}
```

接口方法显式实现

```
namespace IspEx {
    internal class Program {
        static void Main(string[] args) {
            /*
             * 使用var声明不能调用显式实现的方法
             */
            var wk = new WarmKiller();
            wk.Love();  // 只能调用Love
            // 如何调用显式实现的Kill方法
            IKiller killer = wk;
            killer.Kill();

            /*
             * 使用IKiller声明只能调用IKiller显式实现的方法
             */
            IKiller killer2 = new WarmKiller();
            killer2.Kill(); // 只能调用Kill
            // 如何调用非显式实现的Love方法
            var wk2 = killer2 as WarmKiller;
            wk2.Love();
            Console.ReadLine();
        }

    }
    interface IGentleman {
        void Love();
    }

    interface IKiller {
        void Kill();
    }
    class WarmKiller : IGentleman, IKiller {

        public void Love() {
            Console.WriteLine("I will love you foreve");
        }

        // 接口方法显式实现
        void IKiller.Kill() {
            Console.WriteLine("Let me kill the enemy...");
        }
    }

}
```

### 泛型（Generic)

避免成员膨胀或者类型膨胀。

### 泛型类

以下代码装一种物品就需要一种盒子，1000种物品就要1000种盒子。（**类型膨胀**）

```
namespace ConsoleApp1 {
    internal class Program {
        public static void Main(string[] args) {
            Apple apple = new Apple() { Color = "Red " };
            AppleBox applebox = new AppleBox() { Cargo = apple};
            Console.WriteLine(applebox.Cargo.Color);

            Book book = new Book() { Name = "New Book"};
            BookBox bookbox = new BookBox() { Cargo = book };
            Console.WriteLine(bookbox.Cargo.Name);
        }
    }

    class Apple {
        public string Color { get; set; }
    }

    class Book {
        public string Name { get; set; }
    }
    class AppleBox {
        public Apple Cargo { get; set; }
    }
    class BookBox {
        public Book Cargo { get; set; }
    }
}
```

如果只声明Box类包含Apple和Book属性，box1只用到Apple属性，box2只用到Book属性。如果有1000种属性，每次只用1种，其它都用不到。（**成员膨胀**）

```
namespace ConsoleApp1 {
    internal class Program {
        public static void Main(string[] args) {
            Apple apple = new Apple() { Color = "Red " };
            Book book = new Book() { Name = "New Book"};
            Box box1 = new Box() { Apple = apple };
            Box box2 = new Box() { Book = book };
        }
    }

    class Apple {
        public string Color { get; set; }
    }

    class Book {
        public string Name { get; set; }
    }
    class Box {
        public Apple Apple { get; set; }
        public Book Book { get; set; }
    }
}
```

以下代码Box类只声明Object类型的属性，放东西方便，但访问比较麻烦。

```
namespace ConsoleApp1 {
    internal class Program {
        public static void Main(string[] args) {
            Apple apple = new Apple() { Color = "Red " };
            Book book = new Book() { Name = "New Book"};
            Box box1 = new Box() { Cargo = apple };
            Box box2 = new Box() { Cargo = book };
            // 访问比较麻烦
            Console.WriteLine((box1.Cargo as Apple)?.Color);    //使用？,是Apple类型才打印Color,否则打印null
        }
    }

    class Apple {
        public string Color { get; set; }
    }

    class Book {
        public string Name { get; set; }
    }
    class Box {
        public Object Cargo { get; set; }
    }

}
```

使用泛型：

```
namespace ConsoleApp1 {
    internal class Program {
        public static void Main(string[] args) {
            Apple apple = new Apple() { Color = "Red " };
            Book book = new Book() { Name = "New Book"};
            Box<Apple> box1 = new Box<Apple>() { Cargo = apple };
            Box<Book> box2 = new Box<Book>() { Cargo = book };
            Console.WriteLine(box1.Cargo.Color);   // 强类型直接访问Color
            Console.WriteLine(box2.Cargo.Name);
        }
    }

    class Apple {
        public string Color { get; set; }
    }

    class Book {
        public string Name { get; set; }
    }
    class Box<TCargo> {
        public TCargo Cargo { get; set; }
    }

}
```

### 泛型接口

```
namespace ConsoleApp1 {
    internal class Program {
        public static void Main(string[] args) {
            Student<ulong> student = new Student<ulong>();
            student.ID = 10000000000000000001;
            student.Name = "Test";
        }
    }

    interface IUnique<TId> {
        TId ID { get; set; }
    }
    // 类实现接口时没有把接口特化，此时Student是一个泛型类，ID的类型不确定
    class Student<TId> : IUnique<TId> {
        public TId ID { get; set; }
        public string Name { get; set; }
    }

}
```

```
namespace ConsoleApp1 {
    internal class Program {
        public static void Main(string[] args) {
            Student student = new Student();
            student.ID = 10000000000000000001;
            student.Name = "Test";
        }
    }

    interface IUnique<TId> {
        TId ID { get; set; }
    }

    // 类实现接口时把接口特化，ID只能为Ulong类型，此时Student不是泛型类
    class Student : IUnique<ulong> {
        public ulong ID { get; set; }
        public string Name { get; set; }
    }

}
```

### c#提供的泛型接口

```
using System;
using System.Collections.Generic;

namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            IList<int> list = new List<int>();
            for (int i = 0; i < 100; i++) {
                list.Add(i);
            }

            foreach (int i in list) {
                Console.WriteLine(i);
            }

        }
    }
}
```

```
using System;
using System.Collections.Generic;

namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            IDictionary<int,string> map = new Dictionary<int,string>();
            map[1] = "Jack";
            map[2] = "Tom";
            Console.WriteLine($"Student #1 is {map[1]}");
            Console.WriteLine($"Student #2 is {map[2]}");
        }
    }
}
```

### 泛型方法

以下Zip方法接收int数组，无法处理double数组。

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            int[] a1 = { 1, 2, 3 };
            int[] a2 = { 1, 2, 3, 4};
            double[] a3 = { 1.1, 2.2, 3.3};
            double[] a4 = { 1.1, 2.2, 3.3, 4.4 };
            var res = Zip(a1, a2);
            Console.WriteLine(string.Join(",",res));
        }

        static int[] Zip(int[] a, int[] b) {  // a or b not null
            int[] zipped = new int[a.Length + b.Length];
            int ai = 0, bi = 0, zi = 0;
            do {
                if (ai < a.Length) { zipped[zi++] = a[ai++]; }
                if (bi < b.Length) { zipped[zi++] = b[bi++]; }
            } while (ai < a.Length || bi < b.Length);

            return zipped;
        }
    }
}
```

把Zip改为泛型方法，传出的两个数组可以同时为int[]或double[]。

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            int[] a1 = { 1, 2, 3 };
            int[] a2 = { 1, 2, 3, 4};
            double[] a3 = { 1.1, 2.2, 3.3};
            double[] a4 = { 1.1, 2.2, 3.3, 4.4 };
            var res = Zip(a3, a4);
            Console.WriteLine(string.Join(",",res));
        }

        static T[] Zip<T>(T[] a, T[] b) {  // a or b not null
            T[] zipped = new T[a.Length + b.Length];
            int ai = 0, bi = 0, zi = 0;
            do {
                if (ai < a.Length) { zipped[zi++] = a[ai++]; }
                if (bi < b.Length) { zipped[zi++] = b[bi++]; }
            } while (ai < a.Length || bi < b.Length);

            return zipped;
        }
    }
}
```

### 泛型委托

- Action 无返回值委托类

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            Action<string> a1 = Say;
            a1.Invoke("Jack");  // a1("Jack");
            Action<int> a2 = Mul;
            a2(1);
        }

        static void Say(String str) {
            Console.WriteLine($"Hello, {str}.");
        }

        static void Mul(int x) {
            Console.WriteLine(x * 10);
        }

    }
}
```

- Func 有返回值委托类

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            // 前2个是参数类型，最后是返回类型
            Func<double, double, double> func1 = Add;
            var res = func1(100.1, 200.2);
            Console.WriteLine(res);
            Func<int, int, int>  func2 = (a,b) => { return b - a; }; // lambda表达式
            Console.WriteLine(func2(1,2));
        }

        static int Add(int a, int b) {
            return a + b;
        }

        static double Add(double a, double b) {
            return a + b;
        }

    }
}
```

### 事件(Event)

事件就是“能够发生的什么事情”。事件使对象或类具备

**通知能力**

的成员。

![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230320194039635-1080531672.png#id=sfolO&originHeight=811&originWidth=1232&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

```
using System;
using System.Timers;

namespace EventExample
{
    internal class Program
    {
        /* 事件5组成
         * 事件拥有者：Timer
         * 事件：Elapsed
         * 事件响应者：boy对象
         * 事件处理器: Action方法
         * 事件订阅：timer.Elapsed += boy.Action。其中，'+='为事件操作符。
         */
        static void Main(string[] args)
        {
            Timer timer = new Timer();
            timer.Interval = 1000;
            Boy boy = new Boy();
            timer.Elapsed += boy.Action;
            timer.Start();
            Console.ReadLine();
        }
    }

    class Boy
    {
        internal void Action(object sender, ElapsedEventArgs e)
        {
            Console.WriteLine("Jump!");
        }
    }
}
```

### 自定义事件

-  完整声明 
```csharp
using System;
using System.Threading;

namespace EventExample
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Customer customer = new Customer();
            Waiter waiter = new Waiter();
            customer.Order += waiter.Action;
            customer.Action();
            customer.PayTheBill();
        }
    }

    public class OrderEventArgs : EventArgs
    {
        public string DishName { get; set; }

        public string Size { get; set; }
    }

    public delegate void OrderEventHandler(Customer customer, OrderEventArgs e);

    public class Customer
    {

        private OrderEventHandler orderEventHandler; // 委托字段

        // 事件声明
        public event OrderEventHandler Order
        {
            add
            {
                this.orderEventHandler += value;
            }

            remove
            {
                this.orderEventHandler -= value;
            }
        }
        public double Bill { get; set; }

        public void PayTheBill()
        {
            Console.WriteLine("I'll pay ${0}.", this.Bill);
        }

        public void WalkIn()
        {
            Console.WriteLine("Walk into the restaurant.");
        }

        public void SitDown()
        {
            Console.WriteLine("Sit Down.");
        }

        public void Think()
        {
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("Let me think...");
                Thread.Sleep(1000);
            }

            if (this.orderEventHandler != null)
            {
                OrderEventArgs e = new OrderEventArgs();
                e.DishName = "Fish";
                e.Size = "large";
                this.orderEventHandler.Invoke(this, e);
            }
        }

        public void Action()
        {
            Console.ReadLine();
            this.WalkIn();
            this.SitDown();
            this.Think();
        }
    }

    public class Waiter
    {
        public void Action(Customer customer, OrderEventArgs e)
        {
            Console.WriteLine("I'll sevre you the dish - {0}.", e.DishName);
            double price = 10;
            switch (e.Size)
            {
                case "small":
                    price = price*0.5;
                    break;
                case "large":
                    price = price*1.5;
                    break;
                default:
                    break;
            }

            customer.Bill += price;
        }
    }
}
```
 

-  简略声明 
```
using System;
using System.Threading;

namespace EventExample
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Customer customer = new Customer();
            Waiter waiter = new Waiter();
            customer.Order += waiter.Action;
            customer.Action();
            customer.PayTheBill();
        }
    }

    public class OrderEventArgs : EventArgs
    {
        public string DishName { get; set; }

        public string Size { get; set; }
    }

    public delegate void OrderEventHandler(Customer customer, OrderEventArgs e);

    public class Customer
    {
        // 事件简化声明
        public event OrderEventHandler Order;

        public double Bill { get; set; }

        public void PayTheBill()
        {
            Console.WriteLine("I'll pay ${0}.", this.Bill);
        }

        public void WalkIn()
        {
            Console.WriteLine("Walk into the restaurant.");
        }

        public void SitDown()
        {
            Console.WriteLine("Sit Down.");
        }

        public void Think()
        {
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("Let me think...");
                Thread.Sleep(1000);
            }

            if (this.Order != null)
            {
                OrderEventArgs e = new OrderEventArgs();
                e.DishName = "Fish";
                e.Size = "large";
                this.Order.Invoke(this, e);
            }
        }

        public void Action()
        {
            Console.ReadLine();
            this.WalkIn();
            this.SitDown();
            this.Think();
        }
    }

    public class Waiter
    {
        public void Action(Customer customer, OrderEventArgs e)
        {
            Console.WriteLine("I'll sevre you the dish - {0}.", e.DishName);
            double price = 10;
            switch (e.Size)
            {
                case "small":
                    price = price*0.5;
                    break;
                case "large":
                    price = price*1.5;
                    break;
                default:
                    break;
            }

            customer.Bill += price;
        }
    }
}
```

![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230322203253389-182169170.png#id=AVZsz&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 

### 委托(Delegate)

C# 中的委托类似于 C 或 C++ 中函数的指针。委托 是存有对某个方法的引用的一种引用类型变量。引用可在运行时被改变。

委托特别用于实现**事件和回调**方法。所有的委托都派生自 System.Delegate 类。

### 自定义委托

```
namespace @delegate
{
    // 声明自定义委托
    public delegate double Calc(double x,double y);

    internal class Program
    {
        static void Main(string[] args)
        {
            // 创建委托实例
            Calculator calculator = new Calculator();
            Calc calc1 = new Calc(calculator.Add);
            Calc calc2 = new Calc(calculator.Sub);

            double a = 100;
            double b = 20;
            double c = 0;

            // 使用委托对象调用方法
            c = calc1.Invoke(a, b);
            Console.WriteLine(c);
            c = calc2(a, b);
            Console.WriteLine(c);
        }
    }

    class Calculator
    {
        public double Add(double x,double y)
        {
            return x + y;
        }
        public double Sub(double x, double y)
        {
            return x - y;
        }
    }

}
```

### 泛型委托

有效避免类（委托）膨胀

```
namespace ConsoleApp1 {
    internal class Program {
        delegate T MyDele<T>(T x, T y);

        static int Add(int a, int b) {
            return a + b;
        }
        static double Mul(double a, double b) {
            return a * b;
        }
        static void Main(string[] args) {
            MyDele<int> addDele = new MyDele<int>(Add);
            Console.WriteLine(addDele.Invoke(1,2));
            MyDele<double> mulDele = new MyDele<double>(Mul);
            Console.WriteLine(mulDele.Invoke(3.0,4.0));
            Console.WriteLine(addDele.GetType().IsClass); // true
        }
    }
}
```

### C#提供的委托

- Action 无返回值委托类

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            Action<string> a1 = Say;
            a1.Invoke("Jack");  // a1("Jack");
            Action<int> a2 = Mul;
            a2(1);
        }

        static void Say(String str) {
            Console.WriteLine($"Hello, {str}.");
        }

        static void Mul(int x) {
            Console.WriteLine(x * 10);
        }

    }
}
```

- Func 有返回值委托类

```
namespace ConsoleApp1 {
    internal class Program {
        static void Main(string[] args) {
            // 前2个是参数类型，最后是返回类型
            Func<double, double, double> func1 = Add;
            var res = func1(100.1, 200.2);
            Console.WriteLine(res);
            Func<int, int, int>  func2 = (a,b) => { return b - a; }; // lambda表达式
            Console.WriteLine(func2(1,2));
        }

        static int Add(int a, int b) {
            return a + b;
        }

        static double Add(double a, double b) {
            return a + b;
        }

    }
}
```

### 一般使用：模板和回调

- 实例：把方法当作参数传给另一个方法

1. 模板方法：“借用”指定的外部得到来产生结果
2. 回调方法：调用指定的外部方法

```
namespace @delegate
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ProductFactory productFactory = new ProductFactory();
            WrapFactory wrapFactory = new WrapFactory();

            Func<Product> func1 = new Func<Product>(productFactory.MakePizza);
            Func<Product> func2 = new Func<Product>(productFactory.MakeToyCar);

            Logger logger = new Logger();
            Action<Product> log = new Action<Product>(logger.Log);

            Box box1 = wrapFactory.WrapProduct(func1, log);
            Box box2 = wrapFactory.WrapProduct(func2, log);

            Console.WriteLine(box1.Product.Name);
            Console.WriteLine(box2.Product.Name);
            Console.ReadLine();
        }
    }

    class Logger
    {
        public void Log(Product product)
        {
            Console.WriteLine("Product '{0}' created at {1}. Price is {2}.",product.Name,DateTime.UtcNow,product.Price);
        }
    }

    class Product
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }

    class Box
    {
        public Product Product { get; set; }
    }

    class WrapFactory
    {
        // Func<Product> getPruduct 模板方法，好处：扩展产品工厂时，只用新增方法，并委托给模板方法即可；不用修改其他部分。
        // Action<Product> logCallback 回调方法
        // 方法无返回值用Action，有返回值用Func
        public Box WrapProduct(Func<Product> getPruduct,Action<Product> logCallback)
        {
            Box box = new Box();
            Product product = getPruduct.Invoke();
            if (product.Price >= 50)
            {
                logCallback(product);
            }
            box.Product = product;
            return box;
        }

    }
    class ProductFactory
    {
        public Product MakePizza()
        {
            Product product = new Product();
            product.Name = "Pizza";
            product.Price = 20;
            return product;
        }

        public Product MakeToyCar()
        {
            Product product = new Product();
            product.Name = "Toy Car";
            product.Price = 100;
            return product;
        }
    }
}
```

> 委托不可滥用。


![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230320153254136-1662460587.png#id=zYIaW&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

关于缺点3：

![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230320153256338-165578073.png#id=oW7NR&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 高级使用

![](https://img2023.cnblogs.com/blog/2514586/202303/2514586-20230320160252824-1500404133.png#id=Plu5j&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- 多播

```
using System;
using System.Threading;

namespace @delegate
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Student stu1 = new Student() { Id = 1, PenClolr = ConsoleColor.Yellow };
            Student stu2 = new Student() { Id = 2, PenClolr = ConsoleColor.Red };
            Student stu3 = new Student() { Id = 3, PenClolr = ConsoleColor.Blue };
            Action action1 = new Action(stu1.DoHomeWork);
            Action action2 = new Action(stu2.DoHomeWork);
            Action action3 = new Action(stu3.DoHomeWork);
            /* 单播委托
            action1.Invoke();
            action2.Invoke();
            action3.Invoke();
            */

            /* 多播委托
            委托对象可使用 "+" 运算符进行合并。一个合并委托调用它所合并的两个委托。
            只有相同类型的委托可被合并。"-" 运算符可用于从合并的委托中移除组件委托。
            使用委托的这个有用的特点，可以创建一个委托被调用时要调用的方法的调用列表。
            这被称为委托的 多播（multicasting），也叫组播。
            */
            action1 += action2;
            action1 += action3;
            action1.Invoke();

            Console.ReadLine();
        }
    }

    class Student
    {
        public int Id { get; set; }
        public ConsoleColor PenClolr { get; set; }

        public void DoHomeWork()
        {
            for (int i = 0; i < 5; i++)
            {
                Console.ForegroundColor = this.PenClolr;
                Console.WriteLine("Stu {0} doing homework {1} hour(s)",this.Id,i);
                Thread.Sleep(1           }
        }
    }
}
```

-  隐式异步调用
以上多播代码示例为同步调用 

```
using System;
using System.Threading;

namespace @delegate
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Student stu1 = new Student() { Id = 1, PenClolr = ConsoleColor.Yellow };
            Student stu2 = new Student() { Id = 2, PenClolr = ConsoleColor.Red };
            Student stu3 = new Student() { Id = 3, PenClolr = ConsoleColor.Blue };
            Action action1 = new Action(stu1.DoHomeWork);
            Action action2 = new Action(stu2.DoHomeWork);
            Action action3 = new Action(stu3.DoHomeWork);

            /* 隐式异步调用
            action1.BeginInvoke(null, null);
            action2.BeginInvoke(null, null);
            action3.BeginInvoke(null, null);
            */

            for (int i = 0;i< 10; i++)
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine("Main Thread {0}", i);
                Thread.Sleep(1000);
            }

            Console.ReadLine();
        }
    }

    class Student
    {
        public int Id { get; set; }
        public ConsoleColor PenClolr { get; set; }

        public void DoHomeWork()
        {
            for (int i = 0; i < 5; i++)
            {
                Console.ForegroundColor = this.PenClolr;
                Console.WriteLine("Stu {0} doing homework {1} hour(s)",this.Id,i);
                Thread.Sleep(1000);
            }
        }
    }
}
```

### 使用接口取代委托

```
using System;

namespace @delegate
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IProductFactory pizzaFactory = new PizzaFactory();
            IProductFactory toyCarFactory = new ToyCarFactory();
            WrapFactory wrapFactory = new WrapFactory();

            Box box1 = wrapFactory.WrapProduct(pizzaFactory);
            Box box2 = wrapFactory.WrapProduct(toyCarFactory);

            Console.WriteLine(box1.Product.Name);
            Console.WriteLine(box2.Product.Name);
            Console.ReadLine();
        }
    }

    interface IProductFactory
    {
        Product Make();
    }

    class PizzaFactory : IProductFactory
    {
        public Product Make()
        {
            Product product = new Product();
            product.Name = "Pizza";
            product.Price = 20;
            return product;
        }
    }

    class ToyCarFactory : IProductFactory
    {
        public Product Make()
        {
            Product product = new Product();
            product.Name = "Toy Car";
            product.Price = 100;
            return product;
        }
    }

    class Logger
    {
        public void Log(Product product)
        {
            Console.WriteLine("Product '{0}' created at {1}. Price is {2}.", product.Name, DateTime.UtcNow, product.Price);
        }
    }

    class Product
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }

    class Box
    {
        public Product Product { get; set; }
    }

    class WrapFactory
    {
        public Box WrapProduct(IProductFactory productFactory)
        {
            Box box = new Box();
            Product product = productFactory.Make();
            box.Product = product;
            return box;
        }
    }
}
```

### Lamdba表达式

lambda是**InLine**的**匿名**方法。InLine指没有提前声明，使用时直接实现。

- Lamdba表达式传值给委托类型变量

```
namespace ConsoleApp1 {
    internal class Program {
        // 非InLine，有名字的方法
        static int Add(int a, int b) {
            return a + b;
        }

        static void Main(string[] args) {
            Func<int,int,int> func = (int a, int b) => { return a + b; };
            Console.WriteLine(func(1,2));
        }
    }
}
```

- Lamdba表达式传给委托类型参数

```
namespace ConsoleApp1 {
    internal class Program {

        static void DoSomeCal<T>(Func<T,T,T> func, T x, T y) {
            var res = func(x, y);
            Console.WriteLine(res);
        }

        static void Main(string[] args) {
            DoSomeCal<int>((int a, int b) => { return a + b; }, 100, 200);  // 300
        }
    }
}
```

### LINQ

**语言集成查询**（Language Integrated Query，缩写：LINQ），发音"link"，是微软的一项技术，[新增一种自然查询的SQL语法到.NET](http://xn--sql-p18dp5qb6kg5wh7de0nf4k3uojsjqp1a425a3ea.net/) Framework的编程语言中。

### 特性(Attribute)

特性是用于在运行时传递程序中各种元素（比如类、方法、结构、枚举、组件等）的行为信息的声明性标签。

### 预定义特性

1. AttributeUsage

预定义特性 **AttributeUsage** 描述了如何使用一个自定义特性类。

```
[AttributeUsage(
 validon,
 AllowMultiple=allowmultiple,
 Inherited=inherited
)]
```

其中：

- 参数 validon 规定特性可被放置的语言元素。它是枚举器 _AttributeTargets_ 的值的组合。默认值是 _AttributeTargets.All_。
- 参数 _allowmultiple_（可选的）为该特性的 _AllowMultiple_ 属性（property）提供一个布尔值。如果为 true，则该特性是多用的。默认值是 false（单用的）。
- 参数 _inherited_（可选的）为该特性的 _Inherited_ 属性（property）提供一个布尔值。如果为 true，则该特性可被派生类继承。默认值是 false（不被继承）。

1. Conditional

这个预定义特性标记了一个条件方法，其执行依赖于指定的预处理标识符。

```
// 因为#define Release，所以输出Being released.
#define Release
using System.Diagnostics;

namespace ConditionalTest
{
    public class Myclass
    {
        [Conditional("Debug")]
        public static void M1(string msg)
        {
            Console.WriteLine(msg);
        }

        [Conditional("Release")]
        public static void M2(string msg)
        {
            Console.WriteLine(msg);
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Myclass.M1("Being debuged.");
            Myclass.M2("Being released.");
        }
    }
}
```

1. Obsolete

这个预定义特性标记了不应被使用的程序实体。它可以让您通知编译器丢弃某个特定的目标元素。

```
using System;
public class MyClass
{
    // 参数 message，是一个字符串，描述项目为什么过时以及该替代使用什么。
    // 参数 iserror，是一个布尔值。如果该值为 true，编译器应把该项目的使用当作一个错误。默认值是 false（编译器生成一个警告）。
    [Obsolete("Don't use OldMethod, use NewMethod instead", true)]
    static void OldMethod()
    {
        Console.WriteLine("It is the old method");
    }
    static void NewMethod()
    {
        Console.WriteLine("It is the new method");
    }
    public static void Main()
    {
        OldMethod(); // 因为Obsolete的参数 iserror为True,所以编译器报错
    }
}
```

### 自定义特性

1. 创建一个自定义特性
2. 实例化自定义
3. 获取自定义特性的中的变量

```
using System;
using System.Reflection;//System.Reflection 类的 MemberInfo用于发现与类相关的特性（attribute）。
namespace BugFixApplication
{
    #region 1.创建一个自定义特性
    // 一个自定义特性 BugFix 被赋给类及其成员
    [AttributeUsage
    //定义了特性能被放在那些前面
        (AttributeTargets.Class |//规定了特性能被放在class的前面
        AttributeTargets.Constructor |//规定了特性能被放在构造函数的前面
        AttributeTargets.Field |//规定了特性能被放在域的前面
        AttributeTargets.Method |//规定了特性能被放在方法的前面
        AttributeTargets.Property,//规定了特性能被放在属性的前面
        AllowMultiple = true)]//这个属性标记了我们的定制特性能否被重复放置在同一个程序实体前多次。

    public class DeBugInfo : System.Attribute//继承了预定义特性后的自定义特性
    {
        private int bugNo;
        private string developer;
        private string lastReview;
        public string message;

        public DeBugInfo(int bg,string dev,string d) {
            this.bugNo = bg;
            this.developer = dev;
            this.lastReview = d;
        }

        public int BugNo { get { return bugNo;} }
        public string Developer { get { return developer;} }
        public string LastReview { get { return lastReview;} }
        //定义了可以通过Message = "",来对message进行赋值。
        public string Message{get { return message; } set { message = value; }}
    }
    #endregion

    #region 2.实例化自定义
    [DeBugInfo(45, "Zara Ali", "12/8/2012",Message = "Return type mismatch")]
    [DeBugInfo(49, "Nuha Ali", "10/10/2012",Message = "Unused variable")]//前面定义时的AllowMultiple=ture允许了多次使用在同一地方
    #endregion
    class Rectangle
    {
        protected double length;
        protected double width;//定义两个受保护的（封装）的成员变量
        public Rectangle(double l,double w)//构造函数，对两个成员变量进行初始化，公开的
        {
            length = l;
            width = w;
        }

        [DeBugInfo(55, "Zara Ali", "19/10/2012",Message = "Return type mismatch")]
        public double GetArea()
        {
            return length * width;
        }

        [DeBugInfo(56, "Zara Ali", "19/10/2012")]
        public void Display()
        {
            Console.WriteLine("Length: {0}", length);
            Console.WriteLine("Width:{0}", width);
            Console.WriteLine("Area:{0}", GetArea());
        }
    }

    class ExecuteRectangle
    {
        static void Main(string[] args)//程序入口
        {
            Rectangle r = new Rectangle(4.5, 7.5);//实例化
            r.Display();//执行打印长、宽、面积

            #region 3.获取自定义特性的中的变量
            Type type = typeof(Rectangle);
            // 遍历 Rectangle 类的特性
            foreach (Object attributes in type.GetCustomAttributes(false))
            {
                DeBugInfo dbi = (DeBugInfo)attributes;
                if(null != dbi)
                {
                    Console.WriteLine("Bug on: {0}", dbi.BugNo);
                    Console.WriteLine("Developer: {0}", dbi.Developer);
                    Console.WriteLine("Last REviewed: {0}", dbi.LastReview);
                    Console.WriteLine("Remarks: {0}", dbi.Message);
                }
            }
            // 遍历方法特性
            foreach (MethodInfo m in type.GetMethods())//遍历Rectangle类下的所有方法
            {
                foreach (Attribute a in m.GetCustomAttributes(true))//遍历每个方法的特性
                {
                    DeBugInfo? dbi = a as DeBugInfo;//通过 object 声明对象，是用了装箱和取消装箱的概念.
                                                   //也就是说 object 可以看成是所有类型的父类。
                                                   //因此 object 声明的对象可以转换成任意类型的值。
                                                   //通过拆装箱代替强制转换
                    if (null !=dbi)
                    {
                        Console.WriteLine("BugFixApplication no: {0},for Method: {1}", dbi.BugNo, m.Name);
                        Console.WriteLine("Developer:{0}", dbi.Developer);
                        Console.WriteLine("Last Reviewed: {0}", dbi.LastReview);
                        Console.WriteLine("Remarks: {0}", dbi.Message);
                    }
                }
            }
            #endregion
        }
    }
}
```

### 特性实现数据验证

```
using System;

namespace MyAttribute
{
    //基类抽象特性
    public abstract class AbstractValidateAttribute : Attribute
    {
        public abstract bool Validate(object oValue);
    }

    // 子类特性实现–数字长度
    [AttributeUsage(AttributeTargets.Property)]
    public class LongAttribute : AbstractValidateAttribute
    {
        private long _Min = 0;
        private long _Max = 0;
        public LongAttribute(long min, long max)
        {
            this._Min = min;
            this._Max = max;
        }

        public override bool Validate(object oValue)
        {
            return oValue != null
                && long.TryParse(oValue.ToString(), out long lValue)
                && oValue.ToString().Length >= this._Min
                && oValue.ToString().Length <= this._Max;
        }
    }

    // 子类特性实现–数字范围大小
    [AttributeUsage(AttributeTargets.Property)]
    public class LongRangeAttribute : AbstractValidateAttribute
    {
        private long _Min = 0;
        private long _Max = 0;
        public LongRangeAttribute(long min, long max)
        {
            this._Min = min;
            this._Max = max;
        }

        public override bool Validate(object oValue)
        {
            return oValue != null
                && (long)oValue >= this._Min
                && (long)oValue <= this._Max;
        }
    }

    //子类特性实现–不可空
    public class RequiredAttribute : AbstractValidateAttribute
    {
        public override bool Validate(object oValue)
        {
            return oValue != null
                && !string.IsNullOrWhiteSpace(oValue.ToString());
        }
    }

    //子类特性实现–字符串长度
    [AttributeUsage(AttributeTargets.Property)]
    public class StringLengthAttribute : AbstractValidateAttribute
    {
        private int _Min = 0;
        private int _Max = 0;
        public StringLengthAttribute(int min, int max)
        {
            this._Min = min;
            this._Max = max;
        }

        public override bool Validate(object oValue)
        {
            return oValue != null
                && oValue.ToString().Length >= this._Min
                && oValue.ToString().Length <= this._Max;
        }
    }

    // 泛型扩展方法:获取类型的所有特性，遍历调用对应的Validate
    public static class AttributeExtend
    {
        public static bool Validate<T>(this T t)
        {
            Type type = t.GetType();
            foreach (var prop in type.GetProperties())
            {
                if (prop.IsDefined(typeof(AbstractValidateAttribute), true))
                {
                    object oValue = prop.GetValue(t);
                    foreach (AbstractValidateAttribute attribute in prop.GetCustomAttributes(typeof(AbstractValidateAttribute), true))
                    {
                        if (!attribute.Validate(oValue))
                            return false;
                    }
                }
            }
            return true;
        }
    }

    public class Student {
        [LongAttribute(3,5)]
        public long Id { get; set; }
        [StringLength(1,5)]
        public string Name { get; set; }
        //[RequiredAttribute]
        public string QQ { get; set; }
        [LongRangeAttribute(0,100000)]
        public long Salary { get; set; }
    }

    static class Program
    {
        static void Main(string[] args)
        {
            try
            {
                #region 特性实现数据验证，并且可扩展
                {
                    //通过特性去提供额外行为
                    //数据验证--到处都需要验证
                    Student student = new Student()
                    {
                        Id = 123,
                        Name = "并且",
                        QQ = "",
                        Salary = 1010000
                    };

                    if (AttributeExtend.Validate<Student>(student))
                    {
                        Console.WriteLine("特性校验成功");
                    }
                    //1 可以校验多个属性
                    //2 支持多重校验
                    //3 支持规则的随意扩展
                }
                #endregion
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
```
