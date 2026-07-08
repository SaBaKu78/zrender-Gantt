# Gantt

一个基于zrender的甘特图组件

### 一、项目启动步骤

- 拉去项目

- 下载依赖

  `npm install`

- 启动项目

  `npm run dev`

- 访问项目

  `http://localhost:8099`

### 二、项目打包步骤

- 执行命令

  `npm run build`

打包目录介绍

Gantt

----Gantt.iife.js 用于直接 **script**标签引入

----Gantt.js 用于es6模块化引入，及`<script type='model'>`

----style.css css样式

注意事项

---createHashMap函数一定要通过zrender/src/core/util目录导出