Components.Home.ValueProposition = React.createClass({
  goToFeatures(e) {
    e.preventDefault();
    var position = $('#features').position().top;
    var options = {
      offset: position,
      duration: 300,
      mobileHA: false
    };
    $("html").velocity("scroll", options);
  },
  render() {
    return (
      <div id="value-proposition">
        <div className="container">
          <div style={{height: "75px"}} className="hidden-xs"/>
          <h1>Customers Love <em>Faster</em> Apps</h1>
          <h2><span>They hate errors!</span></h2>
          <h3><b>Kadira</b> can make <em>Meteor</em> apps <em>faster</em> with <em>fewer</em> errors</h3>
          <div>
            <a 
              href="#learn-how" 
              rel="external" 
              className="btn learn-how"
              onTouchStart={this.goToFeatures}
              onClick={this.goToFeatures}>Learn How</a>
          </div>
        </div>
      </div>
    );
  }
});