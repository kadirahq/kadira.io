Mixins.LinksInNewTab = {
  chnageLinks() {
    var dom = React.findDOMNode(this);
    $('a', dom).each(function() {
      var node = this;
      var externalUrl = node.origin !== window.location.origin;
      if(externalUrl) {
        $(node).attr('target', '_blank');
      }
    });
  },
  componentDidMount() {
    this.chnageLinks();
  },
  componentDidUpdate() {
    this.chnageLinks();
  },
};