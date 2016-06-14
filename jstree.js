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
    parentid : 0,
    url : "/menu1/22/"
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
    str += '</li><li><a href="' + data[i]["url"] + '">' + data[i]["name"] + '</a></li>';
    continue;
  }
  
  //回上一级菜单
  if(recordList[recordList.length - 1]['level'] > data[i]['level']){
    str += '</ul><li><a href="' + data[i]["url"] + '">' + data[i]["name"] +  '</a>';
    recordList.shift();
    continue;
  }  
}    
    
    str +='</ul> '
    
    console.log(str)
    
    
    
    
    
    
    
    
    




