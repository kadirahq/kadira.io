Meteor.startup(function() {
  if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.ga) {
    ga('create', Meteor.settings.public.ga, 'auto');
  }
});