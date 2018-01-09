# antd 中Search的的background改了不生效
```js
  <div className="global-top-search" style={{float: 'right'}}>
    <Search
      placeholder="搜索..."
      onSearch={ (value) => this.onSearch(value) }
      style={{ width: 200 , backgroundColor: 'red'}}
    />
  </div>
```
