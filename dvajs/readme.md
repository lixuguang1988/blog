# (dva,在IE9~10上的报错)[https://github.com/dvajs/dva/issues/1717] 遇到跟这个同样的问题
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
