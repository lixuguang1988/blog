jQuery(function($){
    // var History = window.History; // Note: We are using a capital H instead of a lower h

    HistoryHash.init();
    var search =  HistoryHash.data,
        type = search.type ? search.type : "all",
        processId = null/*正在处理中工单id*/;

    updatePanel(type); //初始更新panel

    function updatePanel(type){
        APP.metadata = APP.initMetadata();
        switch(type){
            case "all":
                $(".search").show();
                $("select[name=status]").show().prev("label").show();
                $("#all .tbl tbody").html('<tr class="tr-row"><td colspan="8">正在加载</td></tr>')
                APP.metaurl =  jsCtx + "/manage/csc/gdc/gets";
                APP.buildPage(APP.metadata, "#"  + type);
                break;
            case "done":
                $(".search").show();
                $("select[name=status]").hide().prev("label").hide();
                $("#done .cs-done-detail").hide();
                $("#done .tbl tbody").html('<tr class="tr-row"><td colspan="9">正在加载</td></tr>')
                APP.metaurl =  jsCtx + "/manage/csc/ybq/gets";
                APP.buildPage(APP.metadata, "#"  + type);
                break;
            case "todo" :
                $(".search").show();
                $("select[name=status]").hide().prev("label").hide();
                $("#todo .tbl tbody").html('<tr class="tr-row"><td colspan="9">正在加载</td></tr>')
                APP.metaurl =  jsCtx + "/manage/csc/dbq/gets";
                APP.buildPage(APP.metadata, "#"  + type);
                break;
            case "process":
                $(".search").hide();
                updateProcessList();
                break;
            case "wiki":
                $(".search").hide();
                APP.metaurl =  jsCtx + "/manage/csc/question/gets";
                APP.buildPage(APP.metadata, "#"  + type);
                break;
        }

        $(".cs-menu a").each(function(){
            if($(this).data("type") == type){
                $(this).parent().addClass('current').siblings().removeClass('current');
            }
        });
        $(".content > .panel").hide();
        $("#"  + type).show();
    }

    //本页菜单
    $("body").on("click", ".cs-menu a", function(ev){
        ev.preventDefault();
        // HistoryHash.clear();
        // History.pushState(HistoryHash.update({type : $(this).data("type")}), "客服管理-和教育小助手运营管理", "?" + HistoryHash.toString());
        updatePanel($(this).data("type"))
    });

    //搜索
    $(".search input[type=submit]").on("click", function(ev){
        ev.preventDefault();
        var showPanelId = $(".content > .panel:visible").attr("id"),
            serialize = $(".search form").serialize();

        if($("#startdate").val() == false || $("#enddate").val() == false){
            APP.alert('<div class="danger">开始结束时间必填</div>');
            return false;
        }
        switch (showPanelId){
            case "all" :
                APP.metaurl =  jsCtx + '/manage/csc/gdq/query?' + serialize;
                break;
            case "done" :
                APP.metaurl =  jsCtx + '/manage/ybq/gdq/query?' + serialize;
                break;
            case "done" :
                APP.metaurl =  jsCtx + '/manage/dbq/gdq/query?' + serialize;
                break;
        }
        APP.metadata = APP.initMetadata();
        APP.buildPage(APP.metadata, "#"  + showPanelId);
    });

    //动态设置cs-detail-main的宽度
    $(".cs-detail-main").css("width", $(".content").width() - 520);


    /*工单池点击每一个流水号*/
    $("body").on("click", "#all .tbl .cs-view-detail", function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var id = $(this).data("id"),
            type = $(this).data('type');

        if(type == "done"){
            $(".cs-menu a").eq(1).click();
            csView(id);
        }
        if(type == "process"){
            csProcess(id);
            $(".cs-menu a").eq(3).click();
        }
        //如果是未处理,且点击了进入
        //要先处理状态，然后跳转
        if(type=="todo"){
            csupdateStatus('12', id, function(){
                csProcess(id);
                $(".cs-menu a").eq(3).click();
            });
        }
    });

    /*已办区点击每一个流水号*/
    $("body").on("click", "#done .tbl .cs-view-detail", function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var id = $(this).data("id");
        csView(id);
    });

    /*待办区点击每一个流水号*/
    $("body").on("click", "#todo .tbl .cs-view-detail", function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var id = $(this).data("id"),
            type  = $(this).data("type");

        //$(".cs-menu a").eq(3).click();
        //如果是未处理,且点击了进入
        if(type == "todo"){
            //等到状态更新了之后,再跳转
            csupdateStatus('12', id, function(){
                $(".cs-menu a").eq(3).click();
                csProcess(id);
            });
        }else{
            $(".cs-menu a").eq(3).click();
            csProcess(id);
        }
    });

    /*处理中*/
    $("body").on("click", "#process .cs-user", function(){
        csProcess($(this).data("id"));
        updateProcessWorkSheet($(this).data("id"), "#process", true);
    });


    //派单
    $("body").on("click", ".btn-cs-dispatch", function(event){
        var btn = this;
        APP.packageAjax(btn, jsCtx + '/manage/csc/set/status/23', {
            id: processId
        }, function(data){
            if(data.code !=1){
                APP.alert('<span class="danger">出错了.'+ data.desc + '</span>');
                btn.innerHTML = '重试'
            }else{
                processId = null;
                btn.innerHTML = '成功';
                setTimeout(function(){
                    $(".cs-menu a").eq(3).click();
                }, 500);
            }
        });
        return false;
    });


    //修改工单类型
    $("body").on("click", ".btn-cs-save", function(){
        var btn = this;
        APP.packageAjax(btn, jsCtx + '/manage/csc/set/type', {
            id: processId,
            type: $("#process select[name=cstype]").val()
        }, function(data){
            if(data.code !=1){
                btn.innerHTML = '重试'
            }else{
                btn.innerHTML = '成功';
                setTimeout(function(){
                    btn.innerHTML = '保存';
                }, 500);
            }
        });
        return false;
    });

    //结单
    $("body").on("click", ".btn-cs-freeze", function(){
        var btn = this;
        APP.packageAjax(btn, jsCtx + '/manage/csc/set/status/24', {
            id: processId
        }, function(data){
            if(data.code !=1){
                btn.innerHTML = '重试'
            }else{
                btn.innerHTML = '成功';
                processId = null;
                setTimeout(function(){
                    $(".cs-menu a").eq(3).click();
                }, 500);
            }
        });
        return false;
    });


    //更新工单类型的可选项
    APP.getJSON(jsCtx + '/manage/csc/get/types', function(data){
        var options = '<option value="0">请选择</option>';
        if(data.code == 1) {
            $.each(data.object, function () {
                options += '<option value="' + this.id + '">' + this.name + '</option>';
            });
        }
        $("#process select[name=cstype]").html(options);
    });

    // $("body").on("click", ".group-div .arrow", function(ev){
    //     $(this).parent().toggleClass('active').next(".group-deep-div").toggle();
    // });

    //回复处理中的工单
    $("body").on("click", ".btn-cs-reply", function(){
        var btn = this,
            $cs = $("#process .cs-detail-user .current");
        APP.packageAjax(btn, jsCtx + '/manage/csc/wsd/add', {
            id: $cs.data("id"),
            uid: $cs.data("uid"),
            content : $(".cs-replay-content").val()
        }, function(data){
            if(data.code !=1){
                btn.value = '重试'
            }else{
                $(".cs-replay-content").val($(".cs-replay-content")[0]['defaultValue']);
                btn.value = '成功';
                setTimeout(function(){
                    btn.value = '发送';
                }, 500);
                updateProcessWorkSheet(processId, "#process");
            }
        });
        return false;
    });

    //查看工单
    function csView(csid){
        $("#done .cs-done-detail").show();
        $(".cs-detail-info input").val("");
        $("#done .cs-flow-items,  #done .cs-detail-user").html('<div class="text-center">' + APP.loading + '</div>');
        updateProcessWorkSheet(csid, "#done", true);
    }
    //处理工单
    function csProcess(id){
        //
        $("#process .cs-user").each(function(){
            if($(this).data("id") == id){
                $(this).addClass('current');
            }else{
                $(this).removeClass('current');
            }
        });
        $(".cs-detail-info input").val("");
        $("#process .cs-flow-items").html('<div class="text-center">' + APP.loading + '</div>');
        // $("#processid").val(id);
        processId = id;
    }
    //更新工单状态
    function csupdateStatus(direction, id, callback){
        //console.log("把未处理的状态更改为处理中");
        APP.getJSON(jsCtx + '/manage/csc/set/status/' + direction, {id : id}, function(){
            if(typeof callback === "function"){
                callback(id);
            }
        });
    }

    //更新处理中的工单列表
    function updateProcessList(){
        APP.getJSON(jsCtx + '/manage/csc/clz/gets', function(data){
            var html = '';
            if(data.code  != 1 || data.object.length == 0){
                $("#process .cs-detail-none").html(APP.nodata).show().siblings(".cs-detail-inner").show();
            }else{
                $("#process .cs-detail-none").hide();
                $("#process .cs-detail-btn").show();
                
                $.each(data.object, function(){
                    processId = processId || this.id; //从tab页进来的
                    if(this.id == processId){
                        updateProcessInfo(this);
                    }
                    html += '<div class="cs-user' + (this.id == processId ? ' current' : '') + '" data-id="' + this.id + '" data-uid="' + this.userId + '"><img src="' + jsCtx + (this.user.headImageUrl ? this.user.headImageUrl : '/resources/images/x.png' ) +  '" width="62" height="62"><br >' + (this.user.name ? this.user.name : "匿名") + '</div>';
                });
                $("#process .cs-detail-user").html(html);
                updateProcessWorkSheet(processId, "#process");
            }
        });
    }
    //更新正在处理的工单个人信息
    function updateProcessInfo(data){

        function  lefttime(endTime){
            var diff = 0;
            if(!endTime) return '未知';
            diff = (new Date(endTime.replace('-', '/'))).getTime() - (new Date().getTime());
            diff = diff/1000;
            if(diff <= 0){
                return '已超时';
            }
            if(diff > 86400){
                return  '剩余' + Math.ceil(diff/86400) + '天';
            }
            if(diff > 3600){
                return  '剩余' + Math.floor(diff/3600) + '时' + Math.ceil(diff%3600) + '分';
            }
            if(diff > 60){
                return  '剩余' + Math.ceil(diff/60) + '分';
            }
            return '哇，仅剩余' + diff + '秒';
        }

        $(".cs-detail-info input[name=csno]").val(data.id);
        $(".cs-detail-info input[name=csphone]").val(data.userPhone);
        $(".cs-detail-info input[name=csschool]").val(data.user.schoolName);
        $(".cs-detail-info input[name=cszone]").val(data.user.cityName);
        $(".cs-detail-info input[name=csemployee]").val(data.workNo);
        $(".cs-detail-info input[name=cscreateTime]").val(data.createTime);
        $(".cs-detail-info input[name=csaccepttime]").val(data.acceptTime);
        $(".cs-detail-info input[name=cslefttime]").val(lefttime(data.endTime));
    }


    /**
     * 更新工单来往
     * @param processId Number 工单Id
     * @param panelId String 上下文
     * @param isUpdateProcessInfo Boolean 是否要更新个人信息
     */
    function updateProcessWorkSheet(processId, panelId, isUpdateProcessInfo){
        APP.getJSON(jsCtx + '/manage/csc/ws/get', {id : processId}, function(data){
            var html = '';
            if(data.code  != 1 || data.object.serviceWorksheetDetailList.length == 0){
                $(panelId +  " .cs-flow-items").html('<div class="text-center">' + APP.nodata + '</div>');
            }else{
                $.each(data.object.serviceWorksheetDetailList, function(){
                    html += '<div class="cs-flow-item">'
                             + '<div><span>工单流水：</span>'+this.id+'</div>'
                            + '<div><span>用户：</span>'+ data.object.content +'</div>'
                            + '<div><span>客服：</span>' + this.content + this.createTime + '</div>'
                            + '</div>';
                });
                $(panelId + " .cs-flow-items").html(html);
            }
            if(data.code == 1){
                if(isUpdateProcessInfo){
                    updateProcessInfo(data.object);
                }
                if(panelId == "#process"){
                    //更新处理中工单的类型
                    $("#process select[name=cstype] option").each(function(index){
                        if(this.value == data.object.type){
                            $("#process select[name=cstype]")[0]['selectedIndex'] = index;
                        }
                    });
                }
                if(panelId == "#done"){
                    $("#done .cs-detail-user").html('<div class="cs-user"><img src="' + jsCtx + (data.object.user.headImageUrl ? data.object.user.headImageUrl : '/resources/images/x.png' ) +  '" width="62" height="62"><br >' + (data.object.user.name ? data.object.user.name : "匿名") + '</div>');
                }
            }
        });
    }



    /**
     * (取消)置顶
     * @param id String 知识Id(s)
     * @param status Number 知识新的状态
     */
    function setTop(id, istop){
        var url = jsCtx + "/manage/csc/question/top",
            formData = {id : id};

        if(istop == 0){ //置顶
            formData.top = 1;
        }else{
            formData.top = 2;
        }

        APP.getJSON(url, formData, function(data){
            if(data.code != 1){
                if(istop == 0){
                    APP.alert('<span class="danger">置顶失败，请重试</span>');
                }else{
                    APP.alert('<span class="danger">取消置顶失败，请重试</span>');
                }
            }else{
                // if(istop == 0){
                //     APP.alert('<span class="succ">置顶成功!</span>');
                // }else{
                //     APP.alert('<span class="succ">取消置顶成功!</span>');
                // }
                APP.buildPage();
            }
        });
    }

    $("body").on("click", "#done .btn-cs-detail", function(){
        $("#done .cs-done-detail").hide();
    });



    //知识库搜索
    $(".wiki-search input[type=submit]").on("click", function(ev){
        var searchkey = $(this).parent().prev("input").val();
        ev.preventDefault();
        if(searchkey == false || searchkey =="请输入关键字"){return false}
        APP.metadata = APP.initMetadata();
        APP.metadata.keyword = searchkey;
        APP.metaurl =  jsCtx +  "/manage/csc/question/gets/keyword";
        APP.buildPage();
    });
    //添加知识库//编辑知识库
    $("body").on("click", "#wiki .btn-wiki-add, #wiki .wiki-modify", function(event){
        event.preventDefault();
        var modal = null,
            html = $("#wikiAdd").html(),
            url = jsCtx + '/manage/csc/question/add',
            $title, $content, $id, $info;

        modal = APP.confirm(html, "新增知识库", 660, function(obj){
            $info.hide();
            if($title.val() == false){
                $info.html("问题不能为空").show();
                return false;
            }
            if($content.val() == false){
                $info.html("答案不能为空").show();
                return false;
            }
            if($id.val()){
                url = jsCtx + '/manage/csc/question/modify?id=' + $id.val()
            }
            APP.packageAjax(obj, url, {question : $title.val(), answer : $content.val()}, function(data){
                if(data.code != 1){
                    $info.html("失败。<br>" + data.desc).show();
                    $(obj).html("重试");
                }else{
                    APP.modalSuccess(obj, modal);
                }
            });
            return false;
        });
        $title = modal.$body.find("input[name=question]");
        $content = modal.$body.find("textarea[name=answer]");
        $id = modal.$body.find("input[name=id]");
        $info = modal.$body.find(".info");

        //编辑
        if($(this).hasClass("wiki-modify")){
            $title.addClass("text-focus").val($(this).prev("span").html());
            $content.addClass("text-focus").val($(this).parent().next("dd").find("span").html());
            $id.val($(this).parent().data("id"));
        }
    });

    //(取消)置顶知识库
    $("body").on("click", ".wiki-lst .wiki-set-top", function(){
        var id = $(this).parent().data("id");
        setTop(id, $(this).data("top"));
    });

    //知识库、内容关注切换
    $("body").on("click", ".btn-wiki-follow, .back-wiki-main", function(ev){
        ev.preventDefault();
        $(".wiki-follow, .wiki-main").toggle();
        if($(this).hasClass("btn-wiki-follow")){
            getFollow();
        }
    });

    //添加关注组
    $("body").on("click", "#wiki .btn-follow-item", function(ev){
        ev.preventDefault();
        if($(this).hasClass("btn-disable")){return false;}
        $("#wiki .wiki-follow-box").append($("#followItem").html())
        if($("#wiki .follow-item").length == 5){
            $(this).addClass("btn-disable")
        }
    });
    //删除关注组
    $("body").on("click", "#wiki .follow-item-delete", function(){
        APP.getJSON(jsCtx + '/manage/csc/attention/del', {id : $(this).siblings("input[name=id]").val()}, function(){});
        $(this).closest(".follow-item").remove();
        $("#wiki .btn-follow-item").removeClass("btn-disable");
    });
    //添加关注组行
    $("body").on("click", "#wiki .follow-item-add", function(){
        var $followItem = $(this).closest(".follow-item");
        if($(this).closest(".follow-item").find(".follow-item-row").length >= 3){
            APP.alert('<span class="danger">每个关注组最多有3个问题</span>');
            return false;
        }
        if($followItem.find(".follow-item-row").length == 1){
            $(this).parent().find(".follow-item-answer, .follow-item-edit").addClass("follow-visual-hidden")
        }
        $followItem.append($("#followItemRow").html());
        $followItem.find(".follow-item-row").each(function(index){
            $(this).find(".follow-item-push label").html("推" +　(index+1))
            $(this).find(".follow-item-answer label").html("答" +　(index+1))
        });
    });
    //删除关注组行
    $("body").on("click", "#wiki .follow-item-reduce", function(){
        var $followItem = $(this).closest(".follow-item");

        APP.getJSON(jsCtx + '/manage/csc/attention/del', {id : $(this).siblings("input[name=id]").val()}, function(){});
        $(this).parent().remove();
        $followItem.find(".follow-item-row").each(function(index){
            $(this).find(".follow-item-push label").html("推" +　(index+1))
            $(this).find(".follow-item-answer label").html("答" +　(index+1))
        });
        if($followItem.find(".follow-item-row").length == 1){
            $followItem.find(".follow-item-answer, .follow-item-edit").removeClass("follow-visual-hidden");
        }
    });

    //添加修改内容关注图片
    $("body").on("click", ".follow-item-edit", function(){
        var $input = $(this).prev(".follow-item-answer").find("input"),
            $pushurl = $(this).siblings("input[name=pushurl]"),
            id = $(this).siblings("input[name=id]").val(),
            $this = $(this),
            modal = null,
            html = $("#followPushUrl").html(),
            $title, $content, $url, $info, $uploadimage;

        //添加过图片
        // if($(this).hasClass("follow-item-cross")){
        //     $input.val($input.data("value")).prop("readonly", false);
        //     $(this).removeClass("follow-item-cross");
        // }else{
            modal = APP.confirm(html, "编辑", 660, function(btn){
                $info.hide();
                if($title.val() == false){
                    $info.html("标题不能为空").show();
                    return false;
                }
                if($url.val() == false){
                    $info.html("地址不能为空").show();
                    return false;
                }
                if($content.val() == false){
                    $info.html("简介不能为空").show();
                    return false;
                }
                if(!/^http:\/\/|^https:\/\//.test($url.val())){
                    $info.html("地址必须是http、https 协议").show();
                    return false;
                }
                if($uploadimage.val() == '' || !APP.imageType.test($uploadimage.val())){
                    $info.html("请上传图片").show();
                    return false;
                }

                $.ajaxFileUpload({
                    url : jsCtx + '/manage/csc/attention/pro',
                    secureuri : false,
                    fileElementId : "uploadimage",
                    dataType:'text/html',
                    data : {
                        name : "uploadimage",
                        fileds : "uploadimage",
                        title : $title.val(),
                        describe : $content.val(),
                        url : $url.val(),
                        id : id
                    },
                    success : function(data, status) {
                        $(btn).data("ajax", false);

                        data = $.parseJSON(data);
                        if(data.code != 1){
                            $info.html("操作失败" + data.desc).show();
                            return false;
                        }else{
                            $(btn).html("成功");
                            // $this.addClass("follow-item-cross");
                            //保存原先的值,设置只读
                            $input.prop("readonly", true).data("value", $input.val()).val($title.val());

                            $pushurl.data({
                                'title' : $title.val(),
                                'describe' : $content.val(),
                                'url' : $url.val()
                            });
                            setTimeout(function(){
                                modal.close();
                            }, 500);

                        }

                    },
                    error : function(data, status, e) {
                        $info.html("操作失败").show();
                        $(btn).data("ajax", false).html("重试");
                    }
                });

                //阻止窗口关闭
                return false;
            });
            $title = modal.$body.find("input[name=title]");
            $content = modal.$body.find("textarea[name=describe]");
            $url = modal.$body.find("input[name=url]");
            $uploadimage = modal.$body.find("input[name=uploadimage]");
            $info = modal.$body.find(".info");

            //编辑
            if($pushurl.data("title")){
                $title.val($pushurl.data("title")).addClass("text-focus");
                $content.val($pushurl.data("describe")).addClass("text-focus");
                $url.val($pushurl.data("url")).addClass("text-focus");
            }
        // }

    });

    var followItemTimer = null;

    //添加、修改内容关注
    $("body").on("focusout", ".follow-item-row  input[name=answer], .follow-item-row  input[name=question]", function(){
        var $followItem = $(this).closest(".follow-item"),
            $followItemRow = $(this).closest(".follow-item-row"),
            $info = $followItem.find(".info"),
            $id = $followItemRow.find("input[name=id]"),
            parentId = $followItem.find("input[name=id]").first().val(),
            $question = $followItemRow.find("input[name=question]"),
            $answer = $followItemRow.find("input[name=answer]"),
            url = jsCtx + "/manage/csc/attention/add",
            isHeader = $question.hasClass("text-follow-title"),
            formData = {};

        //值没变、问题为空、只读
        if(this.value == $(this).data('oldval') || this.value == this.defaultValue || $question.val() == false || $(this).prop('readonly')){
            return false;
        }

        $(this).data('oldval', this.value);

        if(isHeader){
            formData = {
                question : $question.val(),
                answer : $answer.val()
            };
        }else{
            //子问题没有父问题
            if(!parentId){return false}
            formData = {
                question : $question.val(),
                answer : $answer.val(),
                parentId : parentId
            };
        }
        if($id.val()){
            url = jsCtx + "/manage/csc/attention/modify";
            formData.id = $id.val();
        }
        followItemTimer && clearTimeout(followItemTimer);
        APP.packageAjax($info[0], url, formData, function(data, status, jqxhr){
            if(!$id.val()){
                $id.val(data.code);
            }
            $info.html("成功");
            followItemTimer = setTimeout(function(){
                $info.html("");
            }, 500)
        });
    });

    //关注内容排序
    $("body").on("click", ".follow-item-top", function(){
        var  $followItem = $(this).closest(".follow-item"),
            $prevFollowItem = $followItem.prev(".follow-item");

        if($prevFollowItem.length == 0){return false}
        APP.getJSON(jsCtx + '/manage/csc/attention/sort', {
            id1 : $followItem.find("input[name=id]").val(),
            id2 : $prevFollowItem.find("input[name=id]").val()
        }, function(){
            $followItem.after($prevFollowItem);
        });
    });


    APP.updatePageDom = function(data, context){
        var html = '',
            isCheckedAll = $(".tbl input[name=checkall]").prop("checked"),
            checked = isCheckedAll ? "checked" : "",
            activeRow =isCheckedAll ? " tr-active" : "",
            statusClass = ['', 'todo', 'process', 'done', 'done']
            $tbody = $(".tbl tbody", context);

        //知识库
        if(context == "#wiki"){
            if(!data || !data.length){
                $(".wiki-lst").html('<dt class="wiki-lst-first text-center">'+APP.nodata+'</dt>');
                return false;
            }
            $.each(data, function(index, item){
                html += '<dt class="wiki-lst-first" data-id="'+ item.id +'">' + (index + 1) + '、<span>' + item.question +'</span>'
                    + '<a class="wiki-modify ml-35" href="javascript:void(0);">修改</a><a class="wiki-set-top ml-10" href="javascript:void(0);" data-top="'+ item.top +'">' + (item.top? "取消置顶" : "置顶") + '</a>'
                    + '</dt>'
                    + '<dd>答：<span>' + item.answer + '</span></dd>'
            });
            $(".wiki-lst").html(html);
            return false;
        }

        if(context == "#all"){
            if(!data || !data.length){
                $tbody.html('<tr><td colspan="8">'+APP.nodata+'</td></tr>');
                return false;
            }
            $.each(data, function(index, item){
                html += '<tr class="tr-row' + activeRow +'" data-id="'+ item.id +'" data-status="'+ item.status +'">'
                    + '<td><input type="checkbox" name="checkitem" value="'+ item.id +'" ' + checked+ '></td>'
                    + '<td>'
                    + '<a class="cs-view-detail" href="javascript:void(0);"  data-type="'+ statusClass[item.status] +'" data-id="' + item.id + '"><strong>' + item.id + '</strong></a>'
                    + '</td>'
                    + '<td class="create-at">' + item.createTime + '</td>'
                    + '<td class="create-at">' + item.endTime + '</td>'
                    + '<td>' + item.userPhone + '</td>'
                    + '<td class="text-left">' + (item.content.length > 18 ? item.content.substring(0, 17) + '...' : item.content) + '</td>'
                    + '<td><span class="status-'+ statusClass[item.status] +'">'+ APP.gdStatus[item.status] +'</span></td>'
                    + '<td>' + ( (item.status == 3 || item.status == 4 ) ? item.workNo : '') + '</td>'
                    + '</tr>';
            });
            $tbody.html(html);
            return false;
        }
        if(context == "#done"){
            if(!data || !data.length){
                $tbody.html('<tr><td colspan="9">'+APP.nodata+'</td></tr>');
                return false;
            }
            $.each(data, function(index, item){
                html += '<tr class="tr-row' + activeRow +'" data-id="'+ item.id +'" data-status="'+ item.status +'">'
                    + '<td><input type="checkbox" name="checkitem" value="'+ item.id +'" ' + checked+ '></td>'
                    + '<td>'
                    + '<a class="cs-view-detail" href="javascript:void(0);"  data-type="'+ statusClass[item.status] +'" data-id="' + item.id + '"><strong>' + item.id + '</strong></a>'
                    + '</td>'
                    + '<td class="create-at">' + item.createTime + '</td>'
                    + '<td class="create-at">' + item.endTime + '</td>'
                    + '<td>' + item.userPhone + '</td>'
                    + '<td class="text-left">' + (item.content.length > 18 ? item.content.substring(0, 17) + '...' : item.content) + '</td>'
                    + '<td><span class="status-done">已处理</span></td>'
                    + '<td>' +  item.workNo  + '</td>'
                    + '<td>' + isOutTimeline(item.finishTime, item.endTime) + '</td>'
                    + '</tr>';

            });
            $tbody.html(html);
            return false;
        }
        if(context == "#todo"){
            if(!data || !data.length){
                $tbody.html('<tr><td colspan="9">'+APP.nodata+'</td></tr>');
                return false;
            }
            $.each(data, function(index, item){
                html += '<tr class="tr-row' + activeRow +'" data-id="'+ item.id +'" data-status="'+ item.status +'">'
                    + '<td><input type="checkbox" name="checkitem" value="'+ item.id +'" ' + checked+ '></td>'
                    + '<td>'
                    + '<a class="cs-view-detail" href="javascript:void(0);"  data-type="'+ statusClass[item.status] +'" data-id="' + item.id + '"><strong>' + item.id + '</strong></a>'
                    + '</td>'
                    + '<td class="create-at">' + item.createTime + '</td>'
                    + '<td class="create-at">' + item.endTime + '</td>'
                    + '<td>' + item.userPhone + '</td>'
                    + '<td class="text-left">' + (item.content.length > 18 ? item.content.substring(0, 17) + '...' : item.content) + '</td>'
                    + '<td><span class="status-'+statusClass[item.status]+'">'+ APP.gdStatus[item.status] +'</span></td>'
                    + '<td>' + isOutTimeline(item.finishTime, item.endTime) + '</td>'
                    + '<td><a class="cs-view-detail" href="javascript:void(0)" data-type="'+ statusClass[item.status] +'" data-id="' + item.id + '">进入</a></td>'
                    + '</tr>';

            });
            $tbody.html(html);
            return false;
        }

        function  isOutTimeline(finishTime, endTime){
            if(!finishTime || !endTime) return '否';
            if((new Date(finishTime.replace('-', '/'))) > (new Date(endTime.replace('-', '/')))){
                return '是'
            }
            return '否';
        }

    }


    //获取关注列表
    function getFollow(){
        APP.getJSON(jsCtx + '/manage/csc/attention/gets', function(data){
            var html = '',
                list = null;
            if(data.code != 1 ){
                return false;
            }
            if(data.object.length == 0){
                $(".wiki-follow-box").prepend($("#followItem").html());
                return false;
            }
            $.each(data.object, function(index, item){
                list = item.serviceAttentionList;
                html += ' <div class="follow-item text-center">'
                            + '<div class="info"></div>';
                html += initFollowTtemRow(item, true);

                $.each(list, function(i,it){
                    html += initFollowTtemRow(it, false, i)
                });

                html += '</div>';

            });
            $(".wiki-follow-box").find(".follow-item").remove();
            $(".wiki-follow-box").prepend(html);
        });
    }

    //内容关注行
    function initFollowTtemRow(item, isHeader, index){
        var html = '',
            list = item.serviceAttentionList ? item.serviceAttentionList : [];

        html += '<div class="follow-item-row clearfix">'
                    + '<input type="hidden" name="id" value="'+ item.id +'">';
        if(isHeader){
            html += '<a class="follow-item-add pull-left" href="javascript:void(0);">+</a>';
        }else{
            html += '<a class="follow-item-reduce pull-left" href="javascript:void(0);">-</a>';
        }

        html += '<div class="follow-item-push pull-left ml-10">'
                    + '<label class="pull-left">推' + (isHeader ? '1' : (index+2)) + '</label>'
                    + '<input class="text pull-left text-follow-title" type="text" value="'+ item.question +'" name="question">'
                + '</div>'
                + '<div class="follow-item-answer pull-left' + (list.length ? ' follow-visual-hidden': '') +'">'
                    + '<label class="pull-left">答' + (isHeader ? '1' : (index+2)) + '</label>'
                    + '<input class="text pull-left text-follow-title" type="text" value="'+ (item.title ? item.title : (item.answer ? item.answer : '')) +'" ' + (item.title ? 'readonly' : '') +  ' name="answer">'
                + '</div>'
                + '<a class="follow-item-edit pull-left' + (list.length ? ' follow-visual-hidden': '') +'" href="javascript:void(0);"></a>';

        if(isHeader){
            html += '<a class="follow-item-top pull-left" href="javascript:void(0);"></a>'
                    + '<a class="follow-item-delete pull-left" href="javascript:void(0);"></a>'
        }

        html += '<input type="hidden" name="pushurl" data-title="'+ item.title +'" data-url="'+ item.url +'" data-describe="'+ item.describe +'"  data-imageUrl="'+ item.imageUrl +'">'
        html +='</div>';
        return html;
    }

});

/*handle hash(search)*/
var HistoryHash = {
    data  : null,
    init : function(){
        var hash = window.location.search ? window.location.search : window.location.hash,
            hashArray = [],
            paris = null,
            i = 0,
            data = {};
        hash = hash ? hash.substring(1) : hash;
        hashArray = hash.split("&");
        if(hashArray.length){
            for( ; i < hashArray.length ; i++){
                paris = hashArray[i].split("=");
                if(!paris[1] || paris[0] == "rand") continue;
                data[paris[0]] = decodeURIComponent(paris[1])
            }
        }
        data.rand = Math.random();
        this.data = data;
        return this.data;
    },
    update : function(data){
        var prop = "";
        for(prop in data){
            if(data.hasOwnProperty(prop) && prop !== "rand"){
                this.data[prop] = data[prop];
            }
        }
        data.rand = Math.random();
        this.data = data;
        return this.data;
    },
    clear: function(){
        this.data = {};
    },
    toString :function(){
        var data = this.data,
            str = "",
            prop = "";
        for(prop in data){
            if(data.hasOwnProperty(prop) && prop !== "rand"){
                str += "&" + prop + "=" + data[prop];
            }
        }
        return str.length ? str.substring(1) : str;
    }
};
