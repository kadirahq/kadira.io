Components.Academy = React.createClass({
  componentWillMount() {
    DocHead.setTitle("Kadira Academy");
    DocHead.addMeta({
      name: "description", 
      content: 
        "Learn how to build BulletProof Meteor apps." +
        " - They are Fast, Efficient and Easy to Manage.", 
      id: "description"
    });
  },
  render() {
    return (
      <div className="content-area">
        <div className="container academy">
          <div className="academy-intro">
            <h1>We All Want to Build <em>Better Meteor</em> Apps</h1>
            <h2>Which are <em>Fast</em>, <em>Efficient</em> and <em>Easy to Manage</em></h2>
          </div>
          <div className="academy-sub-intro">
            With Kadira Academy, we share our <b>experience and knowledge</b> with you.
          </div>
          <div className="academy-courses row">
            <Components.Academy.Course 
              title="Meteor Routing Guide"
              color="#75ba50"
              backgroundColor="#FAFFFA"
              link="/academy/meteor-routing-guide" 
              image="https://cldup.com/wsA1ZS8V3y.png" />
            <Components.Academy.Course 
              title="Meteor Performance 101"
              color="#42BAD5"
              backgroundColor="#F8FEFF"
              link="/academy/meteor-performance-101" 
              image="https://cldup.com/UeaOVc8Myp.png" />
            <Components.Academy.Course 
              title="BulletProof Meteor Course"
              color="#DF6565"
              backgroundColor="#FFFCFD"
              subTitle="Learn Meteor Best Practices, DB & Achitecture Modeling"
              link="https://bulletproofmeteor.com" 
              image="https://cldup.com/zdPUp7XGHE.png" />
          </div>
        </div>
      </div>
    );
  }
});

Components.Academy.Course = React.createClass({
  getImage() {
    return <img src={this.props.image} />
  },
  getPlaceHolder() {
    var style = {
      width: "100%",
      height: "300px",
      backgroundColor: "#ddd"
    };
    return <div style={style}/>
  },
  visitLink() {
    if(_.first(this.props.link) === "/") {
      FlowRouter.go(this.props.link);
    } else {
      window.location.href = this.props.link;
    }
  },
  render() {
    var courseStyle = {
      backgroundColor: this.props.backgroundColor,
      border: `2px solid ${this.props.color}`
    };

    var startStyle = {
      backgroundColor: this.props.color
    };

    return <div className="col-md-4">
      <div className="academy-course" style={courseStyle} onClick={this.visitLink}>
        <a href={this.props.link}>
          <h3>{this.props.title}</h3>
          <span className="academy-course-start" style={startStyle}>START LEARNING</span>
        </a>
      </div>
    </div>
  }
});