Triggers = {
  // we need to keep two paths and we are interested 
  // we need to check the first path to do our validations
  _previousPaths: [null, null],
  jumpToPrevScrollPosition(context) {
    var path = context.path;
    var scrollPosition = 0;
    var prevPathInfo = this._previousPaths[0];
    if(prevPathInfo && prevPathInfo.path === context.path) {
      scrollPosition = prevPathInfo.scrollPosition;
    }
    
    if(scrollPosition === 0) {
      // scroll is right away since we don't need to wait for rendering
      $('body').animate({scrollTop: scrollPosition}, 0);
    } else {
      // now we need to wait a bit for react/meteor does rendering
      // We assume, there's subs-manager and we've previous page's data
      // here 10 seconds deley is a arbitary value with some testing.
      setTimeout(function () {
        $('body').animate({scrollTop: scrollPosition}, 0);
      }, 10);
    }
  },
  saveScrollPosition(context) {
    var pathInfo = {
      path: context.path,
      scrollPosition: $('body').scrollTop()
    };

    // add a new path and remove a one from the top
    this._previousPaths.push(pathInfo);
    this._previousPaths.shift();
  },
  sendPageToGa(context) {
    ga('send', 'pageview', context.path);
  }
};

_.each(Triggers, function (value, key) {
  if(typeof value === 'function') {
    Triggers[key] = value.bind(Triggers);
  }
});