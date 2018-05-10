var swipeToClose = {
  isPaneX : false,
  startX: 0, 
  startY: 0, 
  threshold: 80, //滑动距离的阈值
  thresholdFromX: 50, //从左侧开始滑动的阈值
  trackElem: [document.querySelector('#wrapper'), document.querySelector('#header'), document.querySelector('#footer')],
  startTrack: function(e){
    var touch  = e.changedTouches[0];
    //不从左侧滑动 两根手指
    if(touch.pageX > this.thresholdFromX || e.changedTouches.length > 1 ){
      this.isPaneX = false;
      return false;
    }

    this.isPaneX = true;
    this.startX = touch.pageX;
    this.startY = touch.pageY;
  },
  moveTrack: function(e){
    var touch= e.changedTouches[0], 
        tempStartX = touch.pageX,
        tempStartY = touch.pageY;
    //不是左滑 || 两根手指 ||  不处理了 (向上滑幅度过大 ||  Math.abs(tempStartY - this.startY) > 20)
    if(!this.isPaneX || e.changedTouches.length > 1 ){
      this.isPaneX = false;
      this.updateElemPosition(0, 0);
      return false;
    }
    
    this.updateElemPosition(tempStartX - this.startX, 0);
  },
  endTrack: function(e){
    var touch= e.changedTouches[0], 
        tempStartX = touch.pageX,
        tempStartY = touch.pageY;
    //不是左滑 || 两根手指 || 向左滑动幅度过小
    if(!this.isPaneX || e.changedTouches.length > 1  || tempStartX - this.startX < this.threshold){
      this.updateElemPosition(0, 0);
      return false;
    }

    console.log('我是左滑');
    this.updateElemPosition(0, 0);
    this.callBack && this.callBack();
  },
  updateElemPosition: function(x, y){
    if(!this.trackElem.length){
      return false;
    }
    for(var i = 0 ; i < this.trackElem.length; i++){
      this.trackElem[i].style[this.prefixStyle('transform')] = 'translate(' + x  + 'px,' + y +'px)';
    }
  },
  cancelTrack: function(e){
    this.updateElemPosition(0, 0);
  },
  callBack: null,
  vendor: function(){
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
      _elementStyle = document.createElement('div').style,
      transform,
      i = 0,
      l = vendors.length;

    for ( ; i < l; i++ ) {
      transform = vendors[i] + 'ransform';
      if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
    }

    return false;
  }(),
  prefixStyle: function(style) {
    if ( this.vendor === false ) return false;
    if ( this.vendor === '' ) return style;
    return this.vendor + style.charAt(0).toUpperCase() + style.substr(1);
  },
  init: function(options){
    var that = this;
    options = options || {};
    this.threshold = options.threshold || this.threshold;
    this.thresholdFromX = options.thresholdFromX || this.thresholdFromX;
    
    document.body.addEventListener('touchstart', function(event){ that.startTrack },false) 
    document.body.addEventListener('touchmove', function(event){ that.moveTrack },false) 
    document.body.addEventListener('touchend', function(event){ that.endTrack },false) 
    document.body.addEventListener('touchcancel', function(event){ that.endTrack },false) 
    
  }
}
