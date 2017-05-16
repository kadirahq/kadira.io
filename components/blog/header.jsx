Components.Blog.Header = React.createClass({
  forDesktop() {
    return (
      <div className="hidden-xs">
        <a href="http://mad.ly/signups/106624/join" className="btn btn-email" target="_blank">
          <i className="fa fa-envelope-o"></i>
          {" Subscribe via Email"}
        </a>
        <a href="https://twitter.com/kadirahq" className="btn btn-twitter" target="_blank">
          <i className="fa fa-twitter"></i>
          {" Follow us on Twitter"}
        </a>
      </div>
    );
  },
  forMobile() {
    return (
      <div className="visible-xs">
        <a href="http://mad.ly/signups/106624/join" className="btn btn-email" target="_blank">
          <i className="fa fa-envelope-o"></i>
          {" Subscribe"}
        </a>
        <a href="https://twitter.com/kadirahq" className="btn btn-twitter" target="_blank">
          <i className="fa fa-twitter"></i>
          {" Follow"}
        </a>
      </div>
    );
  },
  render() {
    return (
      <div className="blog-header">
        {this.forDesktop()}
        {this.forMobile()}
      </div>
    );
  }
});