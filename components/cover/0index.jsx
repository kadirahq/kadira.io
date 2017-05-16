Components.Cover = React.createClass({
  mixins: [ReactMeteorData],
  firstTime: true,
  getMeteorData() {
    var data = {};
    var canShow = FlowRouter.getRouteName() === "home";
    var depend = new Tracker.Dependency();
    depend.depend();

    // We change the cover based on the device
    // So, we should not decide it on the server side or 
    // when loading the component initially
    if(Meteor.isClient && this.firstTime) {
      Meteor.setTimeout(function() {
        depend.changed();
      });
    }
    data.canShow = !this.firstTime && canShow;

    // We need to show it the defaultPoster when coming from SSR
    // But only in the fisrt time
    data.canShowDefault = canShow;
    if(this.firstTime) {
      this.firstTime = false;
    }
    
    return data;
  },
  getDefaultPoster() {
    return (
      <div id="cover-video" />
    );
  },
  getVideoPoster() {
    return (
      <video autoPlay loop poster="/images/cover.jpeg" id="cover-video">
        <source src="https://cldup.com/SneaHejzpP.mp4" type="video/mp4" />
      </video>
    );
  },
  getPoster() {
    // We remove the video from the home page
    // It's better even without it.
    return this.getDefaultPoster();

    // if(Vendor.IsMobile.any) {
    //   return this.getDefaultPoster();
    // } else {
    //   return this.getVideoPoster();
    // }
  },
  render() {
    if(this.data.canShow) {
      return this.getPoster();
    } else if(this.data.canShowDefault) {
      return this.getDefaultPoster();
    } else {
      return null;
    }
  }
});