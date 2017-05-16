Mixins.UrlMixin = {
  getUrl() {
    var rootUrl = (Meteor.isClient)? location.origin : process.env.ROOT_URL;
    rootUrl = this._removeTrailingSlash(rootUrl);

    var url = `${rootUrl}${FlowRouter.current().path}`;
    url = this._removeTrailingSlash(url);

    return url;
  },

  _removeTrailingSlash(url) {
    if(_.last(url) === "/") {
      // remove trailing slash of the root url
      url = url.substring(0, url.length -1);
    }
    return url;
  }
};