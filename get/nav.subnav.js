var enter_timer = null
, leave_timer = null
, $subNav = $("#subnav")
, $subItems = $subNav.find(".item")
, $navPop = $("#nav .pop");




$navPop.on("mouseenter", function(o) {
  var $this = $(this)
    , index = $navPop.index($this);
  clearTimeout(leave_timer);
  enter_timer = setTimeout(function() {
    $subNav.is(":visible") || $subNav.slideDown("fast");
    $this.addClass("on").siblings(".pop").removeClass("on");
    $subItems.removeClass("active").eq(index).addClass("active")
  }, 100)
}).on("mouseleave", function(i) {
  var $this = $(this);
  clearTimeout(enter_timer);
  leave_timer = setTimeout(function() {
    $subNav.slideUp("fast");
    $navPop.removeClass("on")
  }, 150);
}),
$subNav.on("mouseenter", function(e) {
  clearTimeout(leave_timer)
}).on("mouseleave", function(e) {
  //不清除enter_timer(已经显示了)
  leave_timer = setTimeout(function() {
    $subNav.slideUp("fast");
    $navPop.removeClass("on")
  }, 150)
})

