Components.PageManager = React.createClass({
  mixins: [ReactMeteorData],
  buildNavgationData() {
    var category = this.props.category;
    var pages = Pages.find({categories: category}).fetch();;
    var navData = {
      ready: true,
      intro: null,
      navSets: {},
      orderedNavSets: [],
      subNaves: {},
      showOnlyFirstPage: this.props.showOnlyFirstPage
    };

    // building pages into groups
    pages.forEach((page) => {
      // assign a key for the page
      page.key = this.getKey(page.categories.concat([page.slug]));

      if(page.categories.length === 1) {
        // this is the intro page
        page.link = this.generatePath();
        page.selected = this.isPageSelected(page);
        navData.intro = page;
        return;
      }

      var setName = page.categories[1];
      if(page.categories.length === 2) {
        if(!navData.navSets[setName]) {
          navData.navSets[setName] = {
            pages: [],
            index: page.indexes[1],
            setName: setName
          };
        }

        var params = {setName: setName, page: page.slug};
        page.link = this.generatePath(params);
        page.selected = this.isPageSelected(page);
        navData.navSets[setName].pages.push(page);
        return;
      }

      if(page.categories.length === 3) {
        var key = this.getKey(page.categories);
        if(!navData.subNaves[key]) {
          navData.subNaves[key] = [];
        }

        var params = {
          setName: page.categories[1],
          page: page.categories[2],
          subNav: page.slug
        };
        page.link = this.generatePath(params);
        page.selected = this.isPageSelected(page);
        navData.subNaves[key].push(page);
      }
    });

    // sort individual navSet and push it to the orderedNavSets
    _.each(navData.navSets, (navSet, setName) => {
      navSet.pages.sort((p1, p2) => p1.index - p2.index);
      navData.orderedNavSets.push(navSet);
    });

    // sort orderedNavSets
    navData.orderedNavSets.sort((s1, s2) => s1.index - s2.index);

    // get the selected set to the top
    this.getSelectedNavSetToTop(navData.orderedNavSets);

    // sort individual subNav
    _.each(navData.subNaves, (subNav) => {
      subNav.sort((p1, p2) => p1.index - p2.index);
    });

    return navData;
  },

  generatePath(params) {
    params = params || {};
    params.category = this.props.category;
    var pathDef = "/:category/:setName?/:page?/:subNav?";
    var path = FlowRouter.path(pathDef, params);
    if(this.props.pathPrefix) {
      path = this.props.pathPrefix + path;
    }
    return path;
  },

  getSelectedNavSetToTop(orderedNavSets) {
    var selectedSetName = FlowRouter.getParam('setName');
    if(selectedSetName) {
      var selectedSetIndex = null;
      var selectedSet = null;
      for(var lc=0; lc<orderedNavSets.length; lc++) {
        var set = orderedNavSets[lc];
        if(set.setName === selectedSetName) {
          selectedSetIndex = lc;
          selectedSet = set;
          selectedSet.selected = true;
          break;
        }
      }

      orderedNavSets.splice(selectedSetIndex, 1);
      orderedNavSets.unshift(selectedSet);
    }
  },

  isPageSelected(page) {
    var currentPath = FlowRouter.current().path;
    if(page.categories.length === 1) {
      return currentPath === page.link;
    }

    var selected = currentPath.indexOf(page.link) >= 0;
    return selected;
  },

  getKey(categories) {
    var key = categories.join('::');
    return key;
  },

  pathToSinglePageQuery() {
    FlowRouter.watchPathChange();
    var params = FlowRouter.current().params;
    var payload = {
      categories: [this.props.category],
      slug: null
    };

    // if this is a subNav item
    if(params.subNav) {
      payload.slug = params.subNav;
      payload.categories.push(params.setName);
      payload.categories.push(params.page);
      return payload;
    }

    // if this is a page in the navSet
    if(params.page) {
      payload.slug = params.page;
      payload.categories.push(params.setName);
      return payload;
    }

    // if this is the intro
    payload.slug = this.props.category;
    return payload;
  },

  getMeteorData() {
    var category = this.props.category;
    var singlePageQuery = this.pathToSinglePageQuery();
    var pageHandle = Subs.pages.subscribe('singlePage', singlePageQuery.slug, singlePageQuery.categories);
    var navigationHandle = Subs.navigations.subscribe('pageNavigation', category);
    var data = {
      ready: {
        page: pageHandle.ready(),
        previews: navigationHandle.ready()
      }
    };

    if(data.ready.page) {
      data.page = Pages.findOne(singlePageQuery);
      if(data.page && data.page.content) {
        data.page.content = marked(data.page.content);
        var docTitle = `${data.page.title} | ${this.props.titlePostfix}`;
        DocHead.setTitle(docTitle);
      }
    }

    if(data.ready.previews) {
      data.navData = this.buildNavgationData()
    }

    return data;
  },
  render() {
    return <div className="content-area">
      <div className="container">
        <div className="row" style={{minHeight: "800px"}}>
          <Components.PageManager.Navigation {...this.data.navData}/>
          <Components.PageManager.MobileNavigation {...this.data.navData}/>
          <Components.PageManager.Content page={this.data.page}/>
        </div>
      </div>
    </div>;
  }
});
