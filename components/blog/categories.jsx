Components.Blog.Categories = React.createClass({
  getDefaultProps() {
    var categories = ["all", "product", "meteor", "graphql", "user-story", "other"];
    return {
      categories,
      selectedCategory: "all"
    };
  },
  selectedClass(catName) {
    if(catName === this.props.selectedCategory) {
      return "selected";
    } else {
      return "";
    }
  },
  changeCategory(e) {
    var pageLink = $(e.target).find(":selected").data('url');
    FlowRouter.go(pageLink);
  },
  getForDesktop() {
    return (
      <span className="hidden-xs">
        <span className="blog-category-title">Category:</span>
        {this.props.categories.map((catName) => {
          var classes = `blog-category ${this.selectedClass(catName)}`;
          var category = catName !== 'all'? catName : "";
          var url = `/blog/${category}`
          return (
            <a 
              className={classes} 
              key={catName}
              href={url}>
                {Components.Blog.formatCategory(catName)}
            </a>
          );
        })}
      </span>
    );
  },
  getForMobile() {
    return (
      <span className="visible-xs">
        <span className="blog-category-title">Category:</span>
        <select value={this.props.selectedCategory} onChange={this.changeCategory}>
          {this.props.categories.map((catName) => {
            var category = catName !== 'all'? catName : "";
            var url = `/blog/${category}`
            return (
              <option key={catName} value={catName} data-url={url}>
                {Components.Blog.formatCategory(catName)}
              </option>
            );
          })}
        </select>
      </span>
    );
  },
  render() {
    return (
      <div className="blog-categories">
        {this.getForMobile()}
        {this.getForDesktop()}
      </div>
    );
  }
});