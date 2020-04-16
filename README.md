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
    + 设置为按需导入，则会自动安装babel-plugin-component
    + 并在babel.config.js中配置plugins
    + 在项目根目录下创建plugins目录，创建文件element.js，用于按需导入element
    + 在main.js中导入element.js
- 样式处理：`npm i normalize.css nprogress -S`
- 工具类的库：`npm i js-cookie qs path-to-regexp -S`

## 项目开发过程使用到的包及配置

- `html-webpack-plugin`
- `script-ext-html-webpack-plugin script-loader`
- `svg-sprite-loader svgo`

### browserlist 配置



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


## 附：vscode settings
```
{
  //禁用默认的 js 验证 
  "javascript.validate.enable": false,
  "javascript.format.enable": false,
  "window.zoomLevel": 0, // 两个选择器中是否换行
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
  // #每次保存的时候自动格式化 
  "editor.formatOnSave": true,
  "editor.snippetSuggestions": "top",
  // #每次保存的时候将代码按eslint格式进行修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
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
  // #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  // "vetur.format.defaultFormatter.js": "vscode-typescript",
  // "vetur.format.defaultFormatter.ts": "prettier-tslint",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false, // 去掉分号
      "singleQuote": true // 将双引号转换成单引号
    },
    "js-beautify-html": {
      // #vue组件中html代码格式化样式
      "wrap_attributes": "force-expand-multiline",
      "end_with_newline": false
    }
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