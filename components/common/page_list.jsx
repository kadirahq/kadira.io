Components.PageList = React.createClass({
  mixins: [Mixins.PageMetaInfoMixin],
  getContent() {
    if(!this.props.pages || this.props.pages.length === 0) {
      return <Components.Loading />
    }

    return this.props.pages.map((page) => {
      return <div key={page.slug} className='post-list-item'>
        <h2><a href={this.getPermalink(page)} className="link">{page.title}</a></h2>
        {this.props.showMeta? this.getMetaInfo(page) : null}
        <div className="summery">{ page.summery }</div>
      </div>
    });
  },
  getPermalink(page) {
    var permalink = `/${this.props.category}/${page.category}/${page.slug}`;
    return permalink;
  },
  render() {
    return <div className="post-list">
      {this.getContent()}
    </div>
  }
});
