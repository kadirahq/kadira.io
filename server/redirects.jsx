// These are set of redirects to handle changed locations of 
// Academy

var newPaths = [
  '/academy/meteor-performance-101/content/getting-started-with-kadira',
  '/academy/meteor-performance-101/content/make-your-app-faster',
  '/academy/meteor-performance-101/content/reducing-pubsub-data-usage',
  '/academy/meteor-performance-101/content/improve-cpu-and-network-usage',
  '/academy/meteor-performance-101/content/optimize-memory-usage',
  '/academy/meteor-performance-101/content/reduce-bandwidth-and-cpu-waste',
  '/academy/meteor-performance-101/content/optimize-your-app-for-oplog',
  '/academy/meteor-performance-101/content/managing-waittime',
  '/academy/meteor-performance-101/content/meteor-cpu-profiling',
  '/academy/meteor-performance-101/content/analyze-meteor-cpu-profile',
  '/academy/meteor-performance-101/content/know-your-observers',
  '/academy/meteor-performance-101/content/kadira-insights',
  '/academy/meteor-performance-101/content/understanding-your-meteor-app',
  '/blog/graphql/initial-impression-on-relay-and-graphql'
];

var oldPaths = [
  '/academy/getting-started-with-kadira',
  '/academy/make-your-app-faster',
  '/academy/reducing-pubsub-data-usage',
  '/academy/improve-cpu-and-network-usage',
  '/academy/optimize-memory-usage',
  '/academy/reduce-bandwidth-and-cpu-waste',
  '/academy/optimize-your-app-for-oplog',
  '/academy/managing-waittime',
  '/academy/meteor-cpu-profiling',
  '/academy/analyze-meteor-cpu-profile',
  '/academy/know-your-observers',
  '/academy/kadira-insights',
  '/academy/understanding-your-meteor-app',
  '/blog/graphql/initial-impression-on-react-and-graphql'
];

var pathMap = {};
oldPaths.forEach((oldPath, index) => {
  pathMap[oldPath] = newPaths[index];
});

// add mappings for blog posts as well.
var selector = {category: {$exists: true}};
selector.date = {$lt: new Date("2015 August 7")};
Posts.find(selector).fetch().forEach(function(post) {
  var oldUrl = `/blog/${post.slug}`;
  var newUrl = `/blog/${post.category}/${post.slug}`;
  pathMap[oldUrl] = newUrl;
});

Picker.middleware(function(req, res, next) {
  var url = req.url.replace(/\/$/g, '');
  var redirectPath = pathMap[url];
  if(redirectPath) {
    res.writeHead(301, {
      "Location": redirectPath
    });
    res.end();
  } else {
    next();
  }
});
