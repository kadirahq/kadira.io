MainLayout = React.createClass({
  render() {
    return <div>
      <Components.Header />
      <Components.Cover />
      {this.props.main}
      <Components.Footer />
    </div>
  }
});