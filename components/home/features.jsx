Components.Home.Features = React.createClass({
  getFeature(feature) {
    var style = {};
    if(feature.backgroundColor) {
      style.backgroundColor = feature.backgroundColor;
    }

    return (
      <div key={feature.title} className="feature" style={style}>
        <div className="container">
          <div className="col-md-12">
            <h4>{feature.title}</h4>
            <p className="info" dangerouslySetInnerHTML={{__html: feature.info}} />
          </div>
          <div className="col-md-2" />
          <div className="col-md-8">
            <a href={feature.link}>
              <img className="feature-shot" src={feature.staticImage}/>
            </a>
          </div>
          <div className="col-md-2" />
          <div className="clearfix" />
        </div>
      </div>
    );
  },
  render() {
    return <div id='features' className="content-area">
      <div className="container">
        <h3 id="learn-how" className="sub-heading"><b>Kadira Platform</b> helps you to optimize your <em>Meteor</em> app.</h3>
      </div>
      {this.props.features.map(this.getFeature)}
    </div>
  },
  getDefaultProps() {
    var features = [
      {
        title:"Kadira Debug",
        info: "Understand what's happening inside the Meteor app while <b>developing</b> it.",
        link: "/platform/kadira-debug/overview",
        staticImage: "https://cldup.com/k5sgeup6RG.png"
      },
      {
        title:"Kadira APM",
        info: "See what's happening inside the <b>production</b> app in real time.",
        link: "/platform/kadira-apm/overview",
        staticImage: "https://cldup.com/aUSCtHP9El.png",
        backgroundColor: '#F8F8F8'
      },
      {
        title:"Kadira Error Manager",
        info: "Discover <b>errors</b> and fix them before your users see them.",
        link: "/platform/kadira-error-manager/overview",
        staticImage: "https://cldup.com/cmusI88ZRp.png"
      },
      {
        title:"Kadira Academy",
        info: "Understand Meteor and learn how to <b>optimize</b> it.",
        link: "/platform/kadira-academy/overview",
        staticImage: "https://cldup.com/Ttru01osC4.png",
        backgroundColor: '#F8F8F8'
      }
    ];
    return {features};
  }
});