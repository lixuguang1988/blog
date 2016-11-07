#EChart常见配置项

##配置提示框的触发方式
EChart提示框显示有坐标轴触发<code>axis</code>和点值触发<code>item</code>
```javascript
tooltip : {
  trigger: "axis"; //鼠标到放到轴线上就显示提示框
  trigger: "item": //鼠标移动点值的时候才显示提示框
};
//EChart 会对不同的图给不同的trigger值
```
##配置提示框的提示内容
```javascript
  tooltip : {
    //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等0,1代表series的序列
    formatter: '{b0}: {c0}<br />{b1}: {c1}'; 
    formatter: function(param){
      return param.name + param.value;
      //custom会data里面自定义的值
      return param.value + param.data.value + param.data.name + param.data.custom;
    }
  }
```
##x轴的刻度定制,和x轴没有的刻度怎么显示圆圈
```javascript
tooltip: {
  trigger: "item"  //x轴没有的刻度不能显示tooltip怎么办
}
series: [
        {
            name:'邮件营销',
            type:'line',
            showAllSymbol: true, //标志图形默认只有主轴显示（随主轴标签间隔隐藏策略），如需全部显示可把 showAllSymbol 设为 true。
            data:[]
          }
         ]
```                    


