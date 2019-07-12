## 简要介绍

这个项目是我的基于`ts`的`react`脚手架,项目采用了如下组件构成:

- UI: `antd`
- 数据管理: `redux && react-redux && redux-thunk`
- 路由: `react-router`(v5)
- 请求: `axios`
- 工具组件: `lodash`,`moment`,`classnames`

## 本地调试

1. 拉下代码后,`cd`到项目目录,输入`yarn`下载所需依赖.
2. 修改根目录下的`.env`文件,其中:

   - `REACT_APP_DEV_BASE_URL`:这个值对应着`axios`发出请求的目的地(`host:port/**`),它的值应设为开发环境下项目启动的`host`和`port`.
   - `REACT_APP_PROXY_URL`:这个值对应后端服务器的地址.

     这两个值配置的目的是为了绕过浏览器对于跨域访问的限制.

3. 修改`src`目录下的`setupProxy.js`文件,将当中的`target`字段调整为真实后台服务器地址.如果还需要对代理进行其他配置,具体配置参数请参考[`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware).
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

1. 修改根目录下`.env`文件,其中

   - `REACT_APP_PROD_BASE_URL`: 代表`axios`请求在生产环境下的目标地址.
   - `REACT_APP_PUBLIC_URL`和`PUBLIC_URL`

     如果前端代码部署后并非使用 nginx 进行管理,而是放在`tomcat`这样的容器之中,并且是部署在`webapps`的`ROOT`目录中,那么这两个字段同时设置为`/`(或者删掉也可以,默认为`/`).但是如果不是部署在`ROOT`目录中,而是部署在类似`basePath`的目录下(叫什么无所谓),那么我们在访问时,会带有一个`/basePath/`(等于目录的名字),这是需要将这两个字段同时改为`/bastPath`(一定要同时!!!!).

2. 输入`yarn build`.
3. 将根目录下生成的`build`文件夹内所有的文件,放到自己提供好的容器中.
4. 如果是使用`nginx`之类的代理,那么请根据实际情况进行配置.至此,前端的部署工作就基本结束了.
