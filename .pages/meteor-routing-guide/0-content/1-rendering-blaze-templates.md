---
navTitle: 
navSubTitle: Rendering Blaze Templates
title: Rendering Blaze Templates
enableComments: true
---

To render Blaze templates, we need to use another package called [BlazeLayout](https://github.com/kadirahq/blaze-layout). This separation simplifies how we manage templates and it gives you full control to do whatever you wish.

First, let's add BlazeLayout to our app:

~~~bash
meteor add kadira:blaze-layout
~~~

BlazeLayout is a simple layout manager, which utilizes Blaze's [dynamic templating](https://www.discovermeteor.com/blog/blaze-dynamic-template-includes/) functionality. Let's see how to use BlazeLayout.

First, we need to create a layout for our app. A layout is a common view for the app, which usually contains a header, footer and some dynamic content:

~~~html
<template name="mainLayout">
  <header><h1>Kadira Blog</h1></header>
  <main>
    {{>Template.dynamic template=content}}
  </main>
  <footer>We love Meteor</footer>
</template>
~~~

In the above layout, we can render any template into the main area. The `content` variable carries the name of the template we are rendering with `Template.dynamic`. We pass it via `BlazeLayout.render()`.

Let's define our templates that we put into the main area:

~~~html
<template name="blogHome">
  <p>This is the home page of our blog</p>
  <p>
    <a href="/hello-world">See Hello World Post</a>
  </p>
</template>
~~~

~~~html
<template name="blogPost">
  <p>
    <a href="/">Back</a> <br/>
    This is a single blog post
  </p>
</template>
~~~

Now let's define our two routes, utilizing BlazeLayout:

~~~js
FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogHome"});
  }
});

FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "blogPost"});
  }
});
~~~

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/with-blaze)

Here, we've asked BlazeLayout to render "mainLayout" and pass some data to it. That data has our `content` field with the correct template name. Then, the dynamic templating block in the layout takes care of rendering it.

Like this, we can customize our layout as we need. For example, we can add more dynamic template blocks or conditionally render some templates. We can also switch between multiple layouts.

### Notes on Passing Data

We should **not** pass collection data into BlazeLayout. We'll talk about how to fetch and handle collection data later in this guide.

If we are not using route parameters inside the layout, we should not even pass route params via BlazeLayout.

This is the rule of thumb for passing data:

> You can pass anything to BlazeLayout, but you **should not** pass data into templates like this:
>
> ~~~html
> <main>
>   {{>Template.dynamic template=content data=params}}
> </main>
> ~~~
>
> ~~~js
> FlowRouter.route('/:postId', {
>   action: function(params) {
>     BlazeLayout.render("mainLayout", {
>       content: "blogPost",
>       params: params
>     });
>   }
>});
> ~~~
>
> If you do this, there's a possibility that there will be **unnecessary** template re-renders and there are better ways of addressing this. We are going to discuss these in the section: "Accessing the URL State".

BlazeLayout comes with some additional APIs for customizing it as we need. Have a look at the BlazeLayout [documentation](https://github.com/kadirahq/blaze-layout).