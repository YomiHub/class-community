# class-community

## 初始化项目

### 创建项目

- 安装 vue-cli `npm install @vue/cli -g`,可以通过`vue -V`查看版本（这里使用的是@vue/cli 4.2.3）
- `vue create class-community` 创建名称为 class-community 的项目
  - `Manually select features`手动选择
  - `Babel、Router、Vuex、CSS Pre-processors、 Linter / Formatter`
  - 不使用 history 模式
  - `Sass/SCSS (with node-sass)`选择 sass 作为 CSS Pre-processors
  - `ESLint + Standard config`
  - `Lint on save`
  - `In dedicated config files` 在独立的文件进行配置，而不是在 package.json
  - `Save this as a preset for future projects?` 保存为配置方案 `Save preset as:`base-preset
  - `Pick the package manager to use when installing dependencies`选择 npm

### 将本地项目托管到 github

- 在 github 创建仓库 class-community，得到仓库地址 xxx.git

```
git remote add origin git@github.com:YomiHub/class-community.git   #在本地添加远程仓库
git branch hym  #在本地仓库创建hym分支
git checkout hym  #切换到hym分支
git push origin hym  #如果远程没有分支，则用该命令将hym 提交到远程仓库上面，新建一个该分支
git branch --set-upstream-to=origin/hym hym  #origin/hym是远程分支，将本地分支与远程分支关联

#分支同步主干代码
(hym) git checkout master
(master) git pull origin master --allow-unrelated-histories #拉取远程代码，第一次合并仓库
(master) git checkout hym
(hym) git merge master  #将远程主干代码合并到分支
(hym) git commit -m "将master代码同步到分支"
(hym) git push

#将分支代码合并到master
(hym) git pull  #拉取分支最新代码
(hym) git checkout master
(master) git merge hym --squash    #将分支代码合并到主干
(master) git commit -m "分支代码合并到主干"
(master) git pull origin master
(master) git push origin master   #git push -u origin master  关联并push代码--set-upstream
```

### 安装基本库

- 网络请求：`npm i axios -S`，或者在 vue ui 可视化工具中安装依赖
- UI 组件库：在 vue ui 可视化工具中安装插件 vue-cli-plugin-element
  - 设置为按需导入，则会自动安装 babel-plugin-component
  - 并在 babel.config.js 中配置 plugins
  - 在项目根目录下创建 plugins 目录，创建文件 element.js，用于按需导入 element
  - 在 main.js 中导入 element.js
- 样式处理：`npm i normalize.css nprogress -S`
- 工具类的库：`npm i js-cookie qs path-to-regexp -S`
- 富文本工具 `npm install vue-quill-editor -S`

### browserlist 配置

```
> 1%
last 7 versions,
not ie <= 8,
ios >= 8,
android >= 4.0,
not dead
```

### jsconfig.json

> 使用 jsconfig.json：JavaScript 项目是通过 jsconfig.json 文件定义的。 目录中存在此类文件表示该目录是 JavaScript 项目的根目录。 文件本身可以选择列出属于项目的文件，要从项目中排除的文件，以及编译器选项

- "exclude"排除由构建过程生成的文件（例如，dist 目录）。 这些文件会导致建议显示两次，并会降低 IntelliSense（智能提示）的速度
- "compilerOptions"来配置 JavaScript 语言支持
  - "baseUrl"用于解析非相对模块名称的基目录
  - "paths"指定相对于 baseUrl 选项计算的路径映射(@符号替代项目目录./src/)

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### .env 全局环境变量

- 配置 token key、base api 为全局变量

### 创建 vue.config.js

- 配置修改相关规则

## 项目开发过程使用到的包及配置

- `script-ext-html-webpack-plugin` //添加 async，defer 或 module 属性的<script>元素，甚至他们内联
- `svg-sprite-loader svgo` //svgo 对 svg 进行压缩优化，svg-sprite-loader 将多个 svg 合并，优化网络请求

### svg

- 在 icons>svg 中存放 svg 文件，icons>index.js 全局注册 svg 组件，以及导入 svg
- 在 icons>svgo.yml 配置 svgo 优化规则

### package.json

- 配置 svgo 指令，优化 svg `"svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml"`
  - -f src/icons/svg 中的 -f 表示指定文件夹中以.svg 结尾的文件； src/icons/svg 表示文件夹的路径
  - –config=src/icons/svgo.yml 中的 –config 表示指定用于扩展或者替换默认值的配置文件；

## 开发过程

### 创建文件配置 prettier

- 创建文件.prettierrc，配置规则

### 创建 utils

- 创建 authority.js 用于从 cookie 中获取设置 token，以及用户信息
- 创建 nprogress.js 用于设置进度条相关配置
- 配置 permission.js，设置白名单（无需登录就可以进入的页面），控制路由跳转
- 创建 verify.js ，用于编写正则校验的方法

### 创建 assets>styles

- global.scss 导入 styles 中的所有全局样式
- variables.scss 定义全局变量

### 配置 icons
> 参考[链接1]("https://juejin.im/post/59bb864b5188257e7a427c09")、[链接2]("https://www.jianshu.com/p/c894ea00dfec")
- 将.svg 图标复制到 icons>svg 中
- components下创建SvgIcon.vue模板,通过iconClass
- 在icons下的index.js将SvgIcon模板注册为全局组件，并且使用require.context()导入所有svg

### 在store下创建modules文件夹，存储store模块
- user.js模块用于设置用户信息缓存，进行登录和退出操作
- store下创建getter.js用于获取state
- 在index.js中创建store

### 创建api用于管理用户请求
- `npm install crypto-js -S` 用MD5对密码进行加密
```
import AES from 'crypto-js/aes'
var scretpass = AES.encrypt(user_pass, secret).toString()
var pass = AES.decrypt(scretpass,secret)
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 附：vscode settings (使用 vuter + eslint)
- 使用vetur、eslint、prettier格式化vue项目代码
- .prettierrc配置规则
```
{
  //禁用默认的 js 验证 
  "javascript.validate.enable": false,
  "javascript.format.enable": false,
  "window.zoomLevel": 0, // 两个选择器中是否换行
  //根据文件后缀名定义文件类型
  // "files.associations": {
  //   "*.tpl": "html",
  //   "*.art": "html",
  //   "*.vue": "vue"
  // },
  "git.path": "D:/Git/Git/bin/git.exe",
  "workbench.iconTheme": "vscode-icons",
  "workbench.editor.enablePreview": false, //打开文件不覆盖
  "vsicons.dontShowNewVersionMessage": true,
  "editor.fontSize": 16, //设置文字大小
  "editor.lineNumbers": "on", //开启行数提示
  "editor.quickSuggestions": {
    //开启自动显示建议
    "other": true,
    "comments": true,
    "strings": true
  },
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化，使用eslint在保存時格式化，更正prettier剩余不符合规范问题，故注释该设置
  // "editor.formatOnSave": true,
  "editor.snippetSuggestions": "top",
  // #每次保存的时候将代码按eslint格式进行修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.options": {
    //"configFile": ".eslintrc.js", //指定项目根目录中的eslint配置文件
    "plugins": [
      "html"
    ],
    "extensions": [
      ".js",
      ".vue"
    ]
  },
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "vue",
    "html",
    "typescript"
  ],
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true
  },
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  // "vetur.format.defaultFormatter.js": "vscode-typescript",
  // "vetur.format.defaultFormatter.ts": "prettier-tslint",
  //"prettier-eslint"先使用prettier格式化代码风格再用eslint验证一下代码的语法然后再进一步根据eslint格式化代码https://www.cnblogs.com/wzcsqaws/p/12067834.html，但无法格式化vue中的script标签
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false, // 去掉分号
      "singleQuote": true, // 将双引号转换成单引号
      "eslintIntegration": true
    },
    "js-beautify-html": {
      // #vue组件中html代码格式化样式
      "wrap_attributes": "force-expand-multiline",
      "end_with_newline": false
    }
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"  //設置.vue使用veturg格式化，不是prettier格式化
  },
  // 格式化stylus, 需安装Manta's Stylus Supremacy插件
  // "stylusSupremacy.insertColons": false, // 是否插入冒号
  // "stylusSupremacy.insertSemicolons": false, // 是否插入分号
  // "stylusSupremacy.insertBraces": false, // 是否插入大括号
  // "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  // "stylusSupremacy.insertNewLineAroundBlocks": false,
  //better "comments" 设置注释的样式
  "better-comments.multilineComments": true,
  "better-comments.highlightPlainText": true,
  "better-comments.tags": [
    {
      "tag": "!",
      "color": "#FF2D00",
      "strikethrough": false,
      "backgroundColor": "transparent"
    },
    {
      "tag": "?",
      "color": "#ee782a",
      "strikethrough": false,
      "backgroundColor": "transparent"
    },
    {
      "tag": "//",
      "color": "#474747",
      "strikethrough": false,
      "backgroundColor": "transparent"
    },
    {
      "tag": "todo",
      "color": "#FF8C00",
      "strikethrough": false,
      "backgroundColor": "transparent"
    },
    {
      "tag": "*",
      "color": "#db45a9",
      "strikethrough": false,
      "backgroundColor": "transparent"
    }
  ]
  
}
```
