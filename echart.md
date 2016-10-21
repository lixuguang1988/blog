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
    formatter: '{b0}: {c0}<br />{b1}: {c1}'; //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等0,1代表series的序列
    formatter: function(param){
      return param.name + param.value;
      return param.value + param.data.value + param.data.name + param.data.custom; //custom会data里面自定义的值
    }
  }
```
