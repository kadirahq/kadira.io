Components.ContentContainer = React.createClass({
  getStyle() {
    return {maxWidth: "720px", minHeight: "800px"};
  },
  render() {
    return <div className="content-area">
      <div className="container">
        <div id="content" style={this.getStyle()} className='col-md-7 col-md-offset-2 blog-home full-page-wo-header-footer'>
        {this.props.children}
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  }
});