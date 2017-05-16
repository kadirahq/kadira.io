---
navTitle: 
navSubTitle: Rendering React Components
title: Rendering React Components
enableComments: true
---

To render a React component, we can use [ReactLayout](https://github.com/kadirahq/meteor-react-layout), which is very similar to BlazeLayout.

> In this example, we'll use Meteor's React [integration](http://react-in-meteor.readthedocs.org/en/latest/). So, we will use JSX and ES2015 features. Click [here](http://react-in-meteor.readthedocs.org/en/latest/) to learn about Meteor's React integration.

First, we need to add ReactLayout to our app:

~~~bash
meteor add kadira:react-layout
~~~

Then, we need to create a layout for our app: 

~~~
MainLayout = React.createClass({
  render() {
    return (
      <div>
        <header><h1>Kadira Blog</h1></header>
        <main>{this.props.content}</main>
        <footer>We love Meteor</footer>
      </div>
    );
  }
});
~~~

In the above layout, the component with the `content` prop is rendered inside the `<main>` tag.

Let's create two such components, which will be rendered into the above layout:

~~~
BlogHome = React.createClass({
  render() {
    return (
      <div>
        <p>This is the home page of our blog</p>
        <p>
          <a href="/hello-world">See Hello World Post</a>
        </p>
      </div>
    );
  }
});
~~~

~~~
BlogPost = React.createClass({
  render() {
    return (
      <div>
        <p>
          <a href="/">Back</a> <br/>
          This is a single blog post
        </p>
      </div>
    );
  }
});
~~~

Here's how we can render these components using ReactLayout:

~~~html
FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, {content: <BlogHome />});
  }
});

FlowRouter.route('/:postId', {
  action(params) {
    ReactLayout.render(MainLayout, {content: <BlogPost {...params} />});
  }
});
~~~

> [You can access the complete code via GitHub](https://github.com/flow-examples/flow-router-guide-example/tree/with-react)

Here we ask ReactLayout to render the `BlogHome` and `BlogPost` React elements in the `MainLayout`. In ReactLayout, the first parameter should be a React class (the layout class). The next parameter is the props it passes to the layout instance (created using the layout class).

In the above case, we've created a React element inside the router and passed it via props. Just like this, you can design your layout as you want.

### Notes on Passing Data

You **should not** pass collection data into ReactLayout. We'll talk about how to fetch and handle collection data later in this guide.

With React, a good pattern is to use FlowRouter parameters when creating React elements. In the above example, we created a `BlogPost` React element like that.

See:

~~~js
ReactLayout.render(MainLayout, {content: <BlogPost {...params} />});
~~~

However, in BlazeLayout, this is an anti-pattern. This is due to the way these rendering engines work.

> There are some other options you can use with ReactLayout. One is to use **React context**. Have a look at the ReactLayout [documentation](https://github.com/kadirahq/meteor-react-layout).
