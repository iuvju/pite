### 以jupicker组件为例 ###

## 组件命名 ##

以ju开头、如：jupicker、julogin

## 目录结构 ##

- src ： 源文件目录
- build ： 打包目录（只读）

## 安装yeoman ##

输入命令 `npm install -g yo grunt-cli bower`

## 安装JBC目录生成器 ##

输入命令 `npm install -g generator-jbc`

## 创建JBC组件目录 ##
输入命令

 	mkdir jupicker
	cd jupicker
	yo jbc

## 安装打包工具 ##

输入命令 `npm install`

## 打包方式 ##

输入命令 `grunt --target v2`

v1为默认版本 直接输入  `grunt`

## 规范说明 ##

- 统一使用 UTF-8编码；
- v1为组件版本目录，必须存在，升版本重新创建v2、v3
- index.js为组件入口文件，必须存在
- 打包后的文件会放在build目录中，只发布build目录下的文件
- add()模块时，不要加上模块名称，使用工具自定生成

## 组件调试 ##

组件初始化脚本demo：

    KISSY.use('jbc/jupicker/v1/index',function (S,JuPicker) {
    	new JuPicker();
    });

本地调试，请配置jbc包路径

    if (KISSY.Config.debug) {
		KISSY.config({
			packages: [{
			   name: 'jbc',
			   path: 'http://yuanquan-pc/gitlab'//本地路径
			}],
			map: [
			   [/(.+)jbc\/(\w+)(.+)/g, '$1$2/src$3']
			]
		});
	}

这样就可以使用本地源码文件进行调试了。