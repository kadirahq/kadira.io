Components.PageManager.Content = React.createClass({
  mixins: [Mixins.HighLightMixin, Mixins.UrlMixin, Mixins.LinksInNewTab],
  getComments() {
    return <div className="page-comments">
      <Components.Vendor.Disqus 
        shortname="kadira"
        url={this.getUrl()}/>
    </div>;
  },
  getContent() {
    return <div>
      <h1>{this.props.page.title}</h1>
      <div className="page-content" dangerouslySetInnerHTML={{__html: this.props.page.content}} />
      {this.props.page.enableComments? this.getComments() : null}
    </div>;
  },
  render() {
    return <div className="col-md-9 page-area">
      {this.props.page? this.getContent(): <Components.Loading />}
    </div>;
  }
});
