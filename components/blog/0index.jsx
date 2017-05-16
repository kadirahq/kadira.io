Components.Blog = React.createClass({
  mixins: [ReactMeteorData, Mixins.UrlMixin, Mixins.GifLoaderMixin],
  getPageListData(category) {
    var subHandle = Subs.pages.subscribe('postList', category);
    var data = {
      pageList: true,
      ready: subHandle.ready()
    };

    if(data.ready) {
      var selector = {};
      if(category) {
        selector.category = category;
      } else {
        selector.category = {$exists: true};
      }

      data.pages = Posts.find(selector, {sort: {date: -1}}).fetch();
    }

    var title = "Kadira Blog";
    if(category) {
      title += " - " + Components.Blog.formatCategory(category);
    }
    DocHead.setTitle(title);
    return data;
  },
  getSinglePageData(slug) {
    var subHandle = Subs.pages.subscribe('singlePost', slug);
    var data = {
      ready: subHandle.ready(),
      singlePage: true,
      url: this.getUrl()
    };

    if(data.ready) {
      data.page = Posts.findOne({slug});
      if(data.page && data.page.content) {
        data.page.content = marked(data.page.content);
        DocHead.setTitle(`${data.page.title} | Kadira Blog`);
        this.addSeoTags(data.page);
      }
    }

    return data;
  },
  getMeteorData() {
    if(this.props.slug) {
      return this.getSinglePageData(this.props.slug);
    } else {
      return this.getPageListData(this.props.category);
    }
  },
  getContent() {
    if(this.data.pageList) {
      return <Components.PageList showMeta={true} category='blog' pages={this.data.pages}/>
    } else {
      return <div>
        <Components.Page showMeta={true} page={this.data.page} />
        <Components.Vendor.Disqus 
          shortname="kadira"
          url={this.data.url}/>
      </div>
    }
  },

  render() {
    return <Components.ContentContainer>
      <Components.Blog.Categories selectedCategory={this.props.category}/>
      <div style={{margin: "30px 0"}}>
        {this.getContent()}
      </div>
    </Components.ContentContainer>
  },

  addSeoTags(page) {
    // This is possible to run multiple times. 
    // So we need to have to clean the head
    DocHead.removeDocHeadAddedTags();
    DocHead.addMeta({name: 'description', content: page.summery});
    var image = this._findImage(page);
    var url = this.getUrl();

    // for twitter
    DocHead.addMeta({name: 'twitter:card', content: 'summary_large_image'});
    DocHead.addMeta({name: 'twitter:site', content: '@kadirahq'});
    DocHead.addMeta({name: 'twitter:url', content: url});
    DocHead.addMeta({name: 'twitter:title', content: page.title});
    DocHead.addMeta({name: 'twitter:description', content: page.summery});
    DocHead.addMeta({name: 'twitter:image', content: image});

    // for facebook
    DocHead.addMeta({name: 'og:type', content: 'blog'});
    DocHead.addMeta({name: 'og:site_name', content: 'Kadira Blog'});
    DocHead.addMeta({name: 'og:url', content: url});
    DocHead.addMeta({name: 'og:title', content: page.title});
    DocHead.addMeta({name: 'og:description', content: page.summery});
    DocHead.addMeta({name: 'og:image', content: image});
  },

  _findImage(page) {
    var url = "";
    if(Meteor.isServer) {
      var cheerio = Meteor.npmRequire('cheerio');
      $ = cheerio.load(page.content);
      url = $('img').attr('src');
    } else {
      url = $('img', page.content).attr('src');
    }
    
    url || "https://ui.kadira.io/images/kadira-logo-light.png";
    return url;
  }
});