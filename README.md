## 1. vue脚手架
	用来创建vue项目的工具包
	创建基于脚手架3的项目:
	    npm install -g @vue/cli
      vue create vue-demo3
  创建基于脚手架2的项目
      npm install -g @vue/cli-init
	    vue init webpack vue-demo2
	开发环境运行:
	    cd vue-demo2
	    npm run dev
	生产环境打包发布
	    npm run build
	    npm install -g serve
	    serve dist
	    http://localhost:5000

## 2. eslint
    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查
