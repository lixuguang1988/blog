# for in 和 for of
> for...in语句以任意顺序遍历一个对象的可枚举属性    
> 遍历顺序 有数字，数字从小到大， 然后按插入顺序，先自身属性，后原型
> for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
```js
const person = { hand: 2, foot: 2, head: 1 }
const lucy = Object.create(person)
Object.defineProperty(lucy, 'name', {
  value: 'lucy',
  enumable: false
})
lucy.sex = '女'
for(var prop in lucy){
  console.log(prop)
}
//'sex', 'hand', 'foot', 'head'

const str = 'abc'
for(let char of str){
  console.log(char) //'a', 'b', 'c'
}
for(let p of {name:'lucy'}){
  //Uncaught TypeError: {} is not iterable at <anonymous>:1:15
}
```

# Object.keys() 和 Object.getOwnPropertyNames()
> Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。  
> Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
```js
const person = { hand: 2, foot: 2, head: 1 }
const lucy = Object.create(person)
Object.defineProperty(lucy, 'name', {
  value: 'lucy',
  enumable: false
})
lucy.sex = '女'
console.log(Object.keys(lucy)) //['sex']
console.log(Object.getOwnPropertyNames(lucy)) //['name', 'sex']
```
