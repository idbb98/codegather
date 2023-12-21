import { NavItem } from "vuepress/config";

/**
 * 导航栏配置
 */
export default [
  {
    text: ".net",
    link: "/dotnet/",
  },
  {
    text: "Bing",
    link: "https://cn.bing.com/",
  },
  
  {
    text: "SQL",
    ariaLabel: "SQL Menu",
    items: [
      { text: "MSSQL", link: "/sql/mssql/" },
      { text: "MYSQL", link: "/sql/mysql/" }
    ]
  }
] as NavItem[];
