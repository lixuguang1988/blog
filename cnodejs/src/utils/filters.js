export function getTabTitle(tab){
    var title;
    switch (tab) {
    case "good":
        title = '精华';
        break;
        case "share":
        title = '分享';
        break;
    case "ask":
        title = '问答';
        break;
    case "job":
        title = '招聘';
        break;
    default:
        title = "全部";
        break;
    }
    return title;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function timeAgo(time){
  var d = new Date();
  var ago = new Date(time);

  var year = ago.getFullYear()
  var month = formatNumber(ago.getMonth() + 1)
  var date = formatNumber(ago.getDate())

  var diff = (d.getTime() - ago.getTime()) / 1000;
  
  if( diff < 60 * 5){
    return "刚刚"
  }else if(diff < 60 * 60){
    return Math.floor(diff / 60) + "分钟前";
  }else if(diff < 60 * 60 * 24){
    return Math.floor(diff / 3600) + "小时前";
  }

  if(diff < 86400 * 7){
    return Math.floor(diff / 86400) + "天前";
  }  
  if(d.getFullYear() == year){
    return month + "月" + date + "日 " 
  }
  return  year + "年" + month + "月" + date  + "日 " 
}