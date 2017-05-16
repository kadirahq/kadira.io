Components.PageManager.MobileNavigation = React.createClass({
  getSetName(navSet) {
    return navSet.setName.replace(/-/g, " ");
  },
  hasSelectedSet(){
    var hasSelected = false;
    this.props.orderedNavSets[0].pages.map((page) => {
      if(page.selected){
        hasSelected = true;
      }
    });
    return hasSelected;
  },
  getIntroOption(intro){
    return <option value={intro.link} key={intro.key} >{intro.navSubTitle}</option>;
  },
  goToPage(e) {
    var pageLink = $(e.target).find(":selected").val();
    FlowRouter.go(pageLink);
  },
  getSelectedNav(navType) {
    return this.state[navType];
  },
  getSubNavs(){
    var pages = this.props.orderedNavSets[0].pages;
    var currentPage;
    for (var i = pages.length - 1; i >= 0; i--) {
      if(pages[i].selected) {
        currentPage = pages[i];
        break;
      }
    };
    if(!currentPage || !currentPage) return;

    var subNavs = this.props.subNaves[currentPage.key];
    if(!subNavs) return;

    var selectedSubNav;
    var subNavsOptions = subNavs.map( (subNav) => {
      if(subNav.selected) {
        selectedSubNav = subNav.link;
      }
      return <option value={subNav.link} key={subNav.slug}>{subNav.navTitle}</option>
    });

    return <select className="mobile-sub-nav" onChange={this.goToPage} value={selectedSubNav}>
      <option value={currentPage.link} key="overview">Overview</option>
      {subNavsOptions}
    </select>
  },
  getPages(){
    //not selected a set so dont show the drop down
    if(!this.hasSelectedSet()){
      return;
    }
    var pages = this.props.orderedNavSets[0].pages;
    var selectedPage;
    var pagesOptions = pages.map((page) => {
      if(page.selected){
        selectedPage = page.link;
      }
      return <option value={page.link} key={page.slug}>{page.title}</option>
    });
    return <select className="mobile-page-nav" onChange={this.goToPage} value={selectedPage}>
      {pagesOptions}
    </select>
  },
  getNavSets() {
    var selectedNavSet;
    var navSetOptions = this.props.orderedNavSets.map( (navSet) => {
      var firstPage = navSet.pages[0];
      if(navSet.selected){
        selectedNavSet = firstPage.link;
      }
      return <option value={firstPage.link} key={navSet.setName}>
        {this.getSetName(navSet)}
      </option>;
    });

    return <select onChange={this.goToPage} className="mobile-nav-set" value={selectedNavSet}>
      {this.getIntroOption(this.props.intro)}
      {navSetOptions}
    </select>
  },
  getContent() {
    return <div className="navbar navbar-default">
      {this.getNavSets()}
      {this.getPages()}
      {this.getSubNavs()}
    </div>
  },
  render() {
    return <div className="col-md-3 page-nav visible-xs-block mobile-menu">
      {this.props.ready? this.getContent() : <Components.Loading />}
    </div>
  }
});
