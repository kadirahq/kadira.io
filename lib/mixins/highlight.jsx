Mixins.HighLightMixin = {
  doHighlight() {
    var highLightIt = () => {
      var dom = React.findDOMNode(this);
      var blocks = 0;
      $('pre code', dom).each(function(i, block) {
        Vendor.HighLightJS.highlightBlock(block);
        blocks++
      });
      return blocks;
    }

    // in react, we don't when the actual dom is going to update
    // so we need try hard :(
    var blocks = highLightIt();
    if(blocks === 0) {
      return;
    }

    [10, 20, 30, 50, 70, 100, 500, 1000].forEach(function(timeout) {
      setTimeout(highLightIt, timeout);
    });
  },
  componentDidMount() {
    this.doHighlight();
  },
  componentDidUpdate() {
    this.doHighlight();
  },
};