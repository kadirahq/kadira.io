Mixins.GifLoaderMixin = {
  doLoad() {
    var domNode = React.findDOMNode(this);
    $('[data-gif]', domNode).each(function(index) {
      var img = this;
      if(typeof img.gifLoading !== 'undefined') {
        return;
      }

      img.gifLoading = true;
      $(domNode).ready(function() {
        var gifUrl = $(img).data('gif');
        var loaderGif = $(`<img src='${gifUrl}'/>`);
        loaderGif.load(function() {
          $(img).attr('src', gifUrl);
          img.gifLoading = false;
        });
      });
    });
  },
  componentWillMount() {
    this._loadingImages = {};
  },
  componentDidMount() {
    this.doLoad();
  },
  componentDidUpdate() {
    this.doLoad();
  },
};