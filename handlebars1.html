<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>APP Frame</title>
    <link rel="stylesheet" href="../static/css/common.css" >
    <link rel="stylesheet" href="../static/css/tyChoiceDatePicker.css" >
    <!--[if lt IE 9]>
    <script src="../static/js/json2.js"></script>
    <script src="../static/js/html5shiv.js"></script>
    <![endif]-->
</head>
<body style="background: #fff;padding: 20px;">
    <div id="alarmList" >
        <table class="sys-tbl"  width="100%">
            <thead>
            <tr>
                <th>严重程度</th>
                <th>警报主机/URL</th>
                <th>警报内容</th>
                <th>区域</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>持续时间</th>
                <th>警报状态</th>
            </tr>
            <tbody>
            </tbody>
            </thead>
        </table>
    </div>
<script src="../static/js/message_zh.js"></script>
<script src="../static/js/jquery.min.js"></script>
<script src="../static/js/raphael.min.js"></script>
<script src="../static/js/handlebars.min.js"></script>
<script src="../static/js/plugins.js"></script>
<script src="../static/js/jquery.TyChoiceDatePicker.js"></script>
<script src="../static/js/common.js"></script>
<script id="hello" type="text/x-handlebars-template">
    {{#if events.thisweek}}
    <tr id="thisweek_head" style="" class="row-even">
        <th colspan="8">
            <a class="icon_minus" href="javascript:void(0);" onclick="groupToggle('thisweek', this)"></a>
            <strong>本周</strong>
        </th>
    </tr>
        {{#each events.thisweek}}
            <tr class="thisweek event_item {{oddEvent @index}}">
                <td><div data-tip="严重" class="eventtab_{{icon}}2"></div></td>
                <td>{{name}}</td>
                <td><a href="javascript:void(0)" onclick="openEventDetail(20470,3114878,1)">{{targetName}} 交互时间超过严重阈值{{threshold}}(ms)</a></td>
                <td>{{@key}}</td>
                <td>{{formatMinuteStamp beginTime}}</td>
                <td>{{formatMinuteStamp endTime}}</td>
                <td>{{formatMinute minuteCost}}</td>
                <td>{{status}}</td>
            </tr>
        {{/each}}
    {{/if}}
    {{#if events.lastweek}}
    <tr id="lastweek_head" style="" class="row-even">
        <th colspan="8">
            <a class="icon_minus" href="javascript:void(0);" onclick="groupToggle('lastweek', this)"></a>
            <strong>本周</strong>
        </th>
    </tr>
    {{#each events.lastweek}}
    <tr class="lastweek event_item {{oddEvent @index}}">
        <td><div data-tip="严重" class="eventtab_{{icon}}2"></div></td>
        <td>{{name}}</td>
        <td><a href="javascript:void(0)" onclick="openEventDetail(20470,3114878,1)">{{targetName}} 交互时间超过严重阈值{{threshold}}(ms)</a></td>
        <td>{{@key}}</td>
        <td>{{formatMinuteStamp beginTime}}</td>
        <td>{{formatMinuteStamp endTime}}</td>
        <td>{{formatMinute minuteCost}}</td>
        <td>{{status}}</td>
    </tr>
    {{/each}}
    {{/if}}
</script>
<script type="text/javascript">
    $.getJSON("../data/alertList.json", function(data){
        var template = Handlebars.compile($("#hello").html())
        $("#alarmList table tbody").html(template(data));
    });

    Handlebars.registerHelper('formatMinuteStamp', formatMinuteStamp);
    Handlebars.registerHelper('formatMinute', formatMinute);
    Handlebars.registerHelper('oddEvent', function(index){
        return index % 2 ? "row-even" : "row-odd";
    });

    function formatMinuteStamp(timestamp){
        var d = new Date(timestamp);
        return d.getFullYear()  + "-" + (d.getMonth()+ 1) + "-" + d.getDate() + " " + zeroFill(d.getHours()) + ":" + zeroFill(d.getMinutes());
    }
    function zeroFill(n){
        return n < 10 ?  '0' + n : n;
    }
    function formatMinute(minuteCost){
        var str = "";
        if(minuteCost >= 1440){
            str += Math.floor(minuteCost / 1440) + "天";
            minuteCost = minuteCost % 1440;
        }
        if(minuteCost >= 60){
            str += Math.floor(minuteCost / 60) + "小时";
            minuteCost = minuteCost % 60;
        }
        if(minuteCost){
            str += minuteCost + "分钟"
        }
        return str;
    }


    function groupToggle(group, el){
        if($(el).hasClass("icon_plus")){
            $("." + group).show();
            $(el).removeClass("icon_plus");
        }else{
            $("." + group).hide();
            $(el).addClass("icon_plus");
        }
    }

</script>
</body>
</html>
