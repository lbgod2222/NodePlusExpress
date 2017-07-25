# NodePlusExpress
这是一个用Node+Express框架搭建的博客环境

> “很惭愧，做了一件微小的事”

技术栈：
* NodeJS作为服务器运行
* Express作为开发框架，极大地方便了整站开发
* 考虑到数据状态，采用MongoDB作为数据库，引用了Mongoose作为API编写工具
* 极简式布局与扁平图形（Inspired By Apollo theme in Hexo）

达成目的：
* 顺利运行~
* 用户注册与登录以及信息持久化
* 文章发布
* 文章查询
* 最高权限者文章管理
* 分页管理
* 文章评论与事件记录
* 数据库中用户表
* 数据库中发布表
* 极简化设计

## RUN IT
```bash
$ git clone https://github.com/lbgod2222/NodePlusExpress.git
```
### 进入目录
```bash
$ cd Multiuserblog
```
### 安装依赖
```bash
$ npm i
```
### 首先你得搞个MongoDB的运行环境
```bash
修改数据库入口的设置在model/mongodbcrud.js中
```
### Then
```bash
$ npm run start
```

