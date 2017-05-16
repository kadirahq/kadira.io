Components.Home.UserStories = React.createClass({
  getInitialState() {
    return {};
  },
  componentDidMount() {
    // We select the story when rendered it on the client
    // This is to support SSR and randomly selected stroies.
    var selectedIndex = Math.floor(Math.random() * this.props.stories.length);
    this.setState({
      selectedStory: this.props.stories[selectedIndex]
    });
  },
  getUserStory(story) {
    return (
      <div key={story.logo} className="user-story container">
        <h4>"{story.quote}"</h4>
        <img src={story.logo} /> 
        <h5>{story.who}</h5>
        <a href={story.readMoreLink} className="btn link read-full-story">Read Full Story</a>
      </div>
    );
  },
  render() {
    return (
      <div id="user-stories" className="content-area">
        <div className="container">
          <h3 className="sub-heading">Our Users <b>Love</b> Kadira</h3>
          <div>
            {this.props.stories.map((story) => {
              return this.getUserStory(story);
            })}
          </div>
        </div>
      </div>
    );
  },
  getDefaultProps() {
    var stories = [
      {
        logo: "/images/organizations/workpop.png",
        quote: "The Kadira Dashboard is always open at Workpop.",
        who: "Luis Bitencourt-Emilio, VP of Engineering, Workpop",
        readMoreLink: "/blog/user-story/the-kadira-dashboard-is-always-open-at-workpop"
      },
      {
        logo: "/images/organizations/knotable.png",
        quote: "Kadira just works. It shows everything we need to know about our Meteor app.",
        who: "Angus McLeod, Product Manager, Knotable",
        readMoreLink: "/blog/user-story/knotable-says-kadira-just-works-no-maintenance"
      },
      {
        logo: "/images/organizations/q42.png",
        quote: "Kadira is a no-brainer package that you add before you add everything else.",
        who: "Rahul Choudhury, Head of US operations, Q42",
        readMoreLink: "/blog/user-story/q42-uses-kadira"
      }
    ];

    return {stories};
  },
});