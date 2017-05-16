---
navTitle: Getting Improved Stack Traces with Zone.js
title: Getting Improved Stack Traces with Zone.js
---

We've extended Angular's [Zone.js](https://github.com/angular/zone.js) project and in order to capture some meaningful stack, still using the minified code. It's available as a package called [`meteorhacks:zones`](https://github.com/meteorhacks/zones). 

With this, we can get the context of the error, as shown below:

![](https://kadira.uservoice.com/assets/74590347/Screen%20Shot%202014-09-07%20at%208.16.15%20AM.png)

> Unfortunately, Zone.js is not stable yet and may not work with your app. So, make sure to try it before deploying zones into production.