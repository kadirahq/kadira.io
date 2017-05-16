---
layout: blog_post
title: FlowRouter Now Supports IE9
category: meteor
summery: This is how to get IE9 support with FlowRouter. And, you can see why it was not supported before.
authorName: Pahan Sarathchandra
authorProfile: https://twitter.com/pahans
---

Even thought most of us don't care about legacy browsers like IE9, some apps require that. But, FlowRouter didn't support it. For those apps, not having IE9 support was a barrier to use FlowRouter.

From FlowRouter 2.1.0,  we added IE9 support. But it doesn't ship the **HTML5 history polyfill** out of the box. That's because most of the apps do not require it. If your app needs IE9 support, just add the **HTML5 history polyfill** with the following package.

```
meteor add tmeasday:html5-history-api
```

That's all you've to.

![FlowRouter IE9 Support](https://cldup.com/EohreNWXtC.png)

### Why We Didn't Support It?

Flow Router uses [page.js](https://github.com/visionmedia/page.js) internally for routing. When trying to add IE9+ support, we ran into [this page.js issue](https://github.com/visionmedia/page.js/issues/259)[](https://github.com/visionmedia/page.js/issues/259). 

We sent a [PR](https://github.com/visionmedia/page.js/pull/288) which fixes the issue. But still, it's not merged. So we decided fork page.js until our PR gets merged. 

Since we are using the fork temporary, we didn't create a new NPM package or atmosphere wrapper for the modified `page.js`.  Instead we directly link GitHub tarball with `Npm.depends`.

This is how we did it:

```js
Npm.depends({
  'page': 'https://github.com/kadirahq/page.js/archive/4f6360e1abc4dd950eb9db72e5f80c1c8391112c.tar.gz'
});
```

Hope our PR gets accepted soon :)