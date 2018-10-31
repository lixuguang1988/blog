# dvajs 快速上手
Paranoid_K 的简书文章 [dvajs 上手](https://www.jianshu.com/p/c7b3b9c98d04)

# dvajs 如何配置懒加载的路由
静夜秋雨 的简书文章 [使用 dva 如何配置异步加载路由组件  dva dynamic](https://www.jianshu.com/p/69694013e36b)

# dvajs 动态路由


# [dva,在IE9~10上的报错](https://github.com/dvajs/dva/issues/1717) 遇到跟这个同样的问题
```bash
Warning: The component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change IndexPage to extend React.Component instead.

The above error occurred in the component:

in IndexPage (created by Route)

in Route (created by DvaRoot)

in Switch (created by DvaRoot)
```
解决方法
```bash
npm install --save setprototypeof
# 更新index.js
import 'babel-polyfill';
import 'raf/polyfill';
import dva from 'dva';
import './index.css';
import utils from './utils';
Object.setPrototypeOf = require('setprototypeof');
```

# token 过期问题

> token失效，可以放到服务端判断。
> 然后返回一个带失效状态的status，你在fetch中统一处理就好了
> 例如：服务端返回455
```js
fetch(url).then(respones => {
   if(respones.status === 455) {
        throw new Error('455');
   }
}).then(/*正常的处理*/)
```
> 然后在index.js中使用onError钩子，获取到这一异常，直接dispatch到你的无权限页面就好了。
>> 我在实现的时候发现onError 并不能捕获这个异常, 使用了如下方法
```js 
# request.js
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory()

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => { 
      if(data.ret === -99){
        history.replace('/antd')
        throw new Error('登录已过期,请重新登录！')
      }
      return { data } 
    })
    .catch(err => ({ err }));
}
```

# query-string ie 报错 
> const xx = __webpack_require__('file')
[query-string 安装说明](https://www.npmjs.com/package/query-string#install)
```bash
# 移除 query-string node 版代码
npm uninstall query-string --save
# 安装 query-string 支持 create-react-app 版的代码
npm install query-string@5 --save
```
> query-string 和 qs 的parse   
> queryString.parse(location.search)  解析完整的search  
> qs.parse(location.search.slice(1))  需要手动去除 <code><b>?</b></code>  

# dva + antd + mockjs 实现基础用户管理
[dva + antd + mockjs 实现基础用户管理](http://www.cnblogs.com/besuccess/p/8074914.html)
 
 
