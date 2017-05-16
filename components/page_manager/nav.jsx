Components.PageManager.Nav = React.createClass({
  getClassNames() {
    var classNames = "page-nav-item";
    if(this.props.page.selected) {
      classNames += " selected-nav-item";
    }

    return classNames;
  },
  render() {
    return <a className="no-link" href={this.props.page.link}>
      <div className={this.getClassNames()}>
        <div className="title">
          {this.props.page.navTitle}
        </div>
        <div className="sub-title">
          {this.props.page.navSubTitle}
        </div>
      </div>
    </a>
  }
});
