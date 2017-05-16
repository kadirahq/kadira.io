Subs = {};
Subs.pages = new SubsManager({
  cacheLimit: 50,
  expireIn: 30
});

Subs.navigations = new SubsManager({
  cacheLimit: 10,
  expireIn: 30
});
