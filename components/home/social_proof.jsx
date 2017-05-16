Components.Home.SocialProof = React.createClass({
  getDefaultProps() {
    var organizations = [
      {logo: "/images/organizations/workpop.png", url: "https://workpop.com/"},
      {logo: "/images/organizations/knotable.png", url: "http://knotable.com/"},
      {logo: "/images/organizations/q42.png", url: "http://q42.com/"},
      {logo: "/images/organizations/differential.png", url: "http://differential.com/"},
      {logo: "/images/organizations/grovelabs.png", url: "https://grovelabs.io/"},
      {logo: "/images/organizations/edthena.png", url: "http://www.edthena.com/"},
    ];

    return {organizations};
  },
  render() {
    return (
      <div id="social-proof">
        <div className="container">
          <h3>Trusted by over 5000 Organizations & Developers</h3>
          <div className="organizations">
            {this.props.organizations.map((organization) => {
              return (
                <a key={organization.url} className="organization" href={organization.url} target="_blank">
                  <img src={organization.logo} />
                </a>
              );
            })}
          </div>
          <div>
            <a href="/blog/user-story" className="btn link read-user-stories">Read User Stories</a>
          </div>
        </div>
      </div>
    );
  }
});