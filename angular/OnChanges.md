# OnChanges 当Angular（重新）设置数据绑定输入属性时响应。 该方法接受当前和上一属性值的SimpleChanges对象

## 父组件
```html
  <peek-a-bio name="title"></peek-a-bio>
```
```js
  changeTitle() {
    this.title = 'app(add)';
  }
```


##子组件
```js
  @Input name;
  
  ngOnInit(){
    //是不是不应该在此更改name的值
    setTimeout(()=>{
      //此处改变不会触发ngOnChanges
      this.name = 'afterInit';
      this.logIt(this);
    }, 1000)
  }
  
  ngOnChanges(changes: SimpleChanges){
    this.logIt('onChanges');
    this.logIt(changes);
  }
