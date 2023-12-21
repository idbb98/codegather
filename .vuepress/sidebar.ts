import {SidebarConfig4Multiple} from "vuepress/config";

import dotnetSideBar from "./sidebars/dotnetSideBar";
// @ts-ignore
export default {
    "/dotnet/": dotnetSideBar,
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;
