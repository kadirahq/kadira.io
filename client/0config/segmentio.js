Meteor.startup(function() {
  var segmentIoConfig =
    Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.segmentio;

  if(segmentIoConfig) {
    analytics.load(segmentIoConfig.writeKey);
    configureSegmentIoOnClient();
  }
});

function configureSegmentIoOnClient() {
  var trackedUser = Meteor._localStorage.getItem('user-tracked');
  if(!trackedUser) {
    Meteor._localStorage.setItem('user-tracked', 'yes');
    analytics.track('user-landed');
  }
}