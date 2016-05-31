#给侧边栏的设置height、display,侧边栏消失
```html
 <main class="main">
    <div class="primary">
        <div class="content" >
            主内容区
        </div>
    </div>
    <aside class="aside" >
        <h1>管理平台</h1>
        <ul class="aside-menu">
            <li><a href="#">客户管理</a></li>
            <li><a href="#">小助手页面管理</a></li>
        </ul>
    </aside>
    <div class="clear"></div>
</main>
```
```css
.main{}
.primary{float:left;width:100%;background:#e9eef4}
.content{margin-left:220px;border-left:1px solid #ced9e0;padding:0 16px 20px;background:#fff;min-height:400px;_height:400px;}
.aside{float:left;width:220px;margin-left:-100%;background: #e9eef4;}
.aside-menu li{height:40px;}
```

给    .aside加个    position:relative

