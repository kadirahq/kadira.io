Components.Genie = React.createClass({
  componentDidMount() {
    DocHead.setTitle("Kadira Genie - A Personal Assistant Who Looks After Your Meteor App");
  },
  render() {
    return (
      <main className="home">
        <Components.Genie.Intro />
      </main>
    );
  }
});
