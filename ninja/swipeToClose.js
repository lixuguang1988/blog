var swipeToClose = {
  isPaneX : false,
  touchStartX: 0, 
  touchStartY: 0, 
  trackElem: [document.querySelector('#wrapper'), document.querySelector('#header'), document.querySelector('#footer')],
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
  startTrack: function(e){
    var touch  = e.changedTouches[0];
    //两根手指 || 不从左侧滑动
    if(e.changedTouches.length > 1 || touch.pageX > 80){
      this.isPaneX = false;
      return false;
    }

    this.isPaneX = true;
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
  },
  moveTrack: function(e){
    var touch= e.changedTouches[0], 
        tempStartX = touch.pageX,
        tempStartY = touch.pageY,
        diff;
    //两根手指 || 不是左滑 || (向上滑幅度过大 ||  Math.abs(tempStartY - this.touchStartY) > 20)
    console.log(tempStartY - this.touchStartY, 'diff Y')
    if(!this.isPaneX || e.changedTouches.length > 1 ){
      this.isPaneX = false;
      this.updateElemPosition(0, 0);
      return false;
    }
    
    diff = tempStartX - this.touchStartX;
    this.updateElemPosition(diff, 0);
  },
  endTrack: function(e){
    console.log(e)
    var touch= e.changedTouches[0], 
        tempStartX = touch.pageX,
        tempStartY = touch.pageY;
    //两根手指 || 不是左滑 || 向上滑幅度过大 (||  tempStartY - this.touchStartY > 100) || 向左滑动幅度过小
    if(!this.isPaneX || e.changedTouches.length > 1  || Math.abs(tempStartX - this.touchStartX) < 20){
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
  callBack: null
}
