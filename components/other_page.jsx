Components.OtherPage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var subHandle = Subs.pages.subscribe('singlePost', this.props.slug);
    var data = {
      ready: subHandle.ready()
    };

    if(data.ready) {
      data.page = Posts.findOne({slug: this.props.slug});
      data.page.content = marked(data.page.content);
      DocHead.setTitle(`${data.page.title} | Kadira`);
    }

    return data;
  },
  render() {
    return <Components.ContentContainer>
      <Components.Page page={this.data.page} />
    </Components.ContentContainer>
  }
});
