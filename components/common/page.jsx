Components.Page = React.createClass({
  mixins: [Mixins.PageMetaInfoMixin, Mixins.HighLightMixin, Mixins.LinksInNewTab],
  getContent() {
    if(this.props.page) {
      return <div className="content">
        <h1>{this.props.page.title}</h1>
        {this.props.showMeta? this.getMetaInfo(this.props.page) : null}
        <p dangerouslySetInnerHTML={{__html: this.props.page.content}} />
      </div>
    } else {
      return <Components.Loading />
    }
  },
  render() {
    return <div>
      <div className='post'>
        <div style={{margin: "40px 0 20px 0"}}>
          {this.getContent()}
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  }
});