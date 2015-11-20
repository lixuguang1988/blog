点击<code>textarea</code>IE6/7，<code>textarea</code>会往下面移.   
删除前后的空白

```html
<div class="fd-group">
    <label class="fd-label" for="title">请在此输入标题</label>
    <div class="fd-control">
        <input class="fd-text" autocomplete="off" type="text" name="title" id="title" value="">
    </div>
</div>
<div class="fd-group">
    <label class="fd-label" for="desc">文稿简介</label>
    <div class="fd-control">
      <textarea class="fd-textarea" name="desc" id="desc"></textarea>
    </div>
</div>
<h2>改成</h2>
<div class="fd-group"><label class="fd-label" for="desc">文稿简介</label><div class="fd-control"><textarea class="fd-textarea" name="desc" id="desc"></textarea></div></div>
```

```css
.fd-group{position: relative;padding:0 10px 0 0;margin-bottom:20px;}
.fd-label{position:absolute;left:5px;top:0;color:#999;line-height:36px;}
.fd-text{width:100%;height:24px;line-height:24px;}
.fd-textarea{width:100%;height:48px;}
```

```javascript
$(".fd-text, .fd-textarea").on("click", function(){
    $(this).closest(".fd-group").find(".fd-label").hide();
}).on("blur", function(){
    if( $.trim(this.value) == "" ){
        this.value = "";
        $(this).closest(".fd-group").find(".fd-label").show();
    }
});
```


