Meteor.publish('page', function(permalink) {
  var selector = {permalink};
  var exists = Pages.find(selector).count() === 1;
  if(!exists) {
    throw new Meteor.Error(404, 'page not exits');
  }
  return Pages.find(selector);
});

Meteor.publish('singlePage', function(slug, categories) {
  var selector = {slug};
  if(categories) {
    selector.categories = categories;
  }

  var exists = Pages.find(selector).count() === 1;
  if(!exists) {
    throw new Meteor.Error(404, 'page not exits');
  }
  return Pages.find(selector);
});

Meteor.publish('postList', function(category) {
  var selector = {};
  if(category) {
    selector.category = category
  } else {
    selector.category = {$exists: true};
  }

  var options = {sort: {date: -1}};
  return Posts.find(selector, options);
});

Meteor.publish('singlePost', function(slug) {
  var selector = {slug};

  var exists = Posts.find(selector).count() === 1;
  if(!exists) {
    throw new Meteor.Error(404, 'post not exits');
  }
  return Posts.find(selector);
});

Meteor.publish('pageNavigation', function (category) {
  var selector = {categories: category};
  var options = {fields: {content: 0}};
  return Pages.find(selector, options);
});
