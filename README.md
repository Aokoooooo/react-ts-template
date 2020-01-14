## 简要介绍

这个项目是我的基于`ts`的`react`脚手架,项目采用了如下组件构成:

- UI: `antd`
- 数据管理: `redux && react-redux && redux-aqua`
- 路由: `react-router`(v5)
- 请求: `axios`
- 工具组件: `lodash`,`moment`,`classnames`

## 本地调试

1. 拉下代码后,`cd`到项目目录,输入`yarn`下载所需依赖.
2. 修改根目录下的`.env`文件,其中:

   - `REACT_APP_DEV_BASE_URL`:这个值应填写后端测试服务器`host`和`port`.

     他的目的是为了绕过浏览器对于跨域访问的限制.

3. 如果对于想对代理增加其他配置,请修改`src`目录下的`setupProxy.js`文件,具体配置参数请参考[`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware).
4. 输入`yarn start`启动项目,启动后默认地址为`http://localhost:3000/`

## 项目结构介绍

`src`目录当中的文件结构如下

- `assets`: 存放项目静态资源(如 icon 等).
- `config`: 存放项目基本配置文件.

  - `menuConfig`: 这个文件用于配置侧边栏菜单,以及生成菜单所对应的路由信息(需要传入`path`和对应的组件,具体配置参数详见菜单接口文件).

    由于项目采用`react-router`v5 版本,所以不存在集中式路由管理.这里的路由信息只涉及到每个菜单对应的页面的入口组件,具体这个组件是否还有次级路由(比如`/xx/:id`),请自行考虑和组织.

- `hooks`: 存放`react hooks api`
- `layouts`: 存放项目布局文件

  布局总共分为两种,`BasicLayout`和`LoginLayout`.刚才所讲过的,`menuConfig`所自动配置的路由信息,全部属于`BasicLayout`组件,顾名思义,绝大多数的页面组件,都应归属在这个组价下.而登录相关的页面(注册/登录/忘记密码等等),则归属在`LoginLayout`之下.请根据实际需要进行调整.

- `pages`: 存放页面组件,其中每一个页面对应的文件夹,包含该页面的组件/store 等部分,即
  - `index.tsx`
  - `components`(dir)
  - `store`(`redux` store)
- `utils`: 存放项目工具文件

## 开发说明

项目使用`tslint`和`style-lint`进行代码格式管理,可以通过输入`yarn lint-fix`进行检查和修复(如果可以的话).同时可以通过输入`yarn prettier`进行格式化操作.

项目配有`git pre-commit`钩子,会在提交之前自动检查和格式化待提交文件.请不要无视检查中弹出的提示和警告,让项目保持一个良好的运行状态.

## 部署说明

部署的简要步骤如下:

1.  修改根目录下`.env`文件,其中

    - `REACT_APP_PROD_BASE_URL`: 代表`axios`请求在生产环境下的目标地址.
    - `REACT_APP_PUBLIC_URL`和`PUBLIC_URL`

      常见的部署容器有两种:`nginx`和`tomcat`.

      - `nginx`:

        `nginx`下没有必要去配置这两个部分(因为你需要配置`nginx`).`nginx`监听正确的端口之后,需要将`location`的匹配方式更改为`try_files`,如下所示:

        ```sh
        location / {
            try_files $uri /index.html
        }
        ```

        这样你所有的请求`nginx`都会返回这这个资源,而不是根据请求路径的去寻找其他资源了.

      - `tomcat`

        如果是部署在`webapps`的`ROOT`目录中,那么这两个字段同时设置为`/`(或者删掉也可以,默认为`/`).但是如果不是部署在`ROOT`目录中,而是部署在比如`basePath`的目录下,那么我们在访问时,路径需要带有一个`/basePath/`前缀(等于目录的名字),这时需要将这两个字段同时改为`/bastPath`(一定要同时!!!!).这样你所有的路由匹配/跳转都会拥有这个前缀,并且静态资源的引用关系也会变更为相对路径(换句话说不会再和你讲我找不到资源了)

        另外打包时我会把`WEB-INF`打包进去,这样资源寻找失败(404)会默认返回`index.html`,效果和`nginx`的`try_file`类似.所以请不要删除`WEB-INF`目录(或者你明白自己在做什么的话)

2.  如果打包时,不想压缩代码(神奇的需求),那么请在`.env`中添加这两个参数:

    - `MINIMIZE_STATIC_FILE`: 不压缩`/static` 文件夹中的静态文件(`css`,`js`,`media`).
    - `MINIMIZE_INDEX_FILE`: 不压缩`index.html`文件.

          这两参数的值,不传或者传`true`,则代表压缩,否则为不压缩.

3.  输入`yarn build`.
4.  将根目录下生成的`build`文件夹内所有的文件,放到已经准备好的容器中.
