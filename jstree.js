var data = [
  {
    id : 1,
    name : "菜单1",
    level :　1,
    parentid : 0,
    url : "/menu1/"
  },
  {
    id : 2,
    name : "菜单2",
    level :　1,
    parentid : 0,
    url : "/menu2/"
  },
  {
    id : 21,
    name : "菜单21",
    level :　2,
    parentid : 2,
    url : "/menu1/21/"
  },
  {
    id : 22,
    name : "菜单22",
    level :　2,
    parentid : 2,
    url : "/menu1/22/"
  }, 
  {
    id : 322,
    name : "菜单322",
    level :　3,
    parentid : 22,
    url : "/menu1/22/322/"
  },
  {
    id : 4322,
    name : "菜单4322",
    level :　4,
    parentid : 322,
    url : "/menu1/22/322/4322/"
  },
  {
    id : 23,
    name : "菜单23",
    level :　2,
    parentid : 0,
    url : "/menu1/23/"
  },
  {
    id : 3,
    name : "菜单3",
    level :　1,
    parentid : 0,
    url : "/menu3/"
  }
];



var recordList = [] /*记录遍历的树*/,
    str = '<ul class="js-tree">',
    i = 0,
    len = data.length ;
    
    
for( ; i < len; i++){
  if(recordList.length === 0){
    str += '<li><a href="' + data[i]["url"] + '">' + data[i]["name"] + '</a>';
    recordList.push(data[i]);
    continue;
  }
  
  //子级菜单
  if(recordList[recordList.length - 1]['level'] < data[i]['level']){
    str += '<ul><li><a href="' + data[i]["url"] + '">' + data[i]["name"] + '</a>';
    recordList.push(data[i]);
    continue;
  }  
  
  //同级菜单
  if(recordList[recordList.length - 1]['level'] === data[i]['level']){
    str += '</li><li><a href="' + data[i]["url"] + '">' + data[i]["name"] + '</a>';
    continue;
  }
  
  //回上一级菜单
  if(recordList[recordList.length - 1]['level'] > data[i]['level']){
    for(var  j = 0; j < recordList[recordList.length - 1]['level'] - data[i]['level']; j++){
      str += '</li></ul>';
    }
    str += '<li><a href="' + data[i]["url"] + '">' + data[i]["name"] +  '</a>';
    recordList.shift();
    continue;
  }  
}    
    
   for(i = 0; i < recordList.length; i++){
      str += '</li></ul>';
   }
    
    
    console.log(str);
    
    
    var div = document.createElement("div");
      
    div.innerHTML = str;
    
    document.body.appendChild(div);
    
    
    
    
    
    
    
    
    




