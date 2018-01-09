# 页面导航/login页，但是/register 里面导入css 也加载了
```js
  // APP.js
  render(){
    return (
        <div className="App">
          <Route exact path='/' render={()=>(
            <Redirect to='/dashboard' />
          )} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
          
        </div>
   )
}       
```

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assert/login.css';

class Register extends Component {
  render() {
    return (
      <div className="member-form">
        <h2>用户注册 </h2>
        <p>请前往<a target="_blank" href="ddd" rel="noopener noreferrer" >xxx</a>注册</p>
        <p>已有账号，去<Link to="/login">登陆</Link></p>
      </div>
    );
  }
}

export default Register;
```

react css in js来实现 组件级的css分离，可以使用styled-component/css-module 来 独立的css
