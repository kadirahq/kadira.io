Components.PageManager.Navigation = React.createClass({
  propTypes: {
    // indication whether navigation is ready or not
    ready: React.PropTypes.bool,
    // contains the page object which shows on the top
    intro: React.PropTypes.object,
    // a map of navSets
    navSets: React.PropTypes.object,
    // ordered array of navSets
    orderedNavSets: React.PropTypes.array,
    // a map of navNavs by the page key
    subNaves: React.PropTypes.object,
    // this is an UX optimization when having a lot of pages and navSets
    // if enabled, only the fist page will show from each navSet
    // when selected all will be shown
    showOnlyFirstPage: React.PropTypes.bool
  },
  getIntro() {
    return <Components.PageManager.Nav page={this.props.intro} />
  },
  getSetName(navSet) {
    return navSet.setName.replace(/-/g, " ");
  },
  getSubNav(subNav) {
    return <div className="page-subnav">
      {subNav.map((page) => {
        var classNames = "page-subnav-item";
        if(page.selected) {
          classNames += " selected-subnav-item";
        }
        return <a key={page._id} className="no-link" href={page.link}>
          <div  className={classNames}>{page.navTitle}</div>
        </a>
      })}
    </div>
  },
  getNav(page) {
    var subNav = this.props.subNaves[page.key];
    return <div key={page._id}>
      <Components.PageManager.Nav page={page}/>
      {subNav && page.selected? this.getSubNav(subNav) : null }
    </div>
  },
  getNavPages(navSet) {
    var pages = navSet.pages;
    
    // show the first page unless the navSet is selected
    // and only if enabled it via props
    if(this.props.showOnlyFirstPage && !navSet.selected) {
      pages = [];
      var firstPage = navSet.pages[0];
      if(firstPage) {
        pages.push(firstPage);
      }
    }

    return <div>
      {pages.map((page) => {
        return this.getNav(page)
      })}
    </div>
  },
  getNavSets() {
    return <div className="page-nav-sets">
      {this.props.orderedNavSets.map((navSet) => {
        return <div key={this.getSetName(navSet)} className="page-nav-set">
          <h3>{this.getSetName(navSet)}</h3>
          {this.getNavPages(navSet)}
        </div>;
      })}
    </div>
  },
  getContent() {
    return <div>
      {this.getIntro()}
      {this.getNavSets()}
    </div>
  },
  render() {
    return <div className="col-md-3 page-nav hidden-xs">
      {this.props.ready? this.getContent() : <Components.Loading />}
    </div>
  }
});
