title: Top ES2015 Features in 15 Minutes
category: other
summery: These are our favorite ES2015 features and we used them to build parts of Kadira.
---

<img style="display:none" src="https://cldup.com/yJoiKAZ3YU.png" />

At Kadira, we've started to use a lot of React instead of Blaze and FlowComponents. [Kadira Debug](https://kadira.io/platform/kadira-debug/overview) and [our website](https://kadira.io/) are some examples. When we are using React, we try to maximize our use of ES2015. Here are our favorite ES2015 features.

**These are pretty useful and very easy to adapt.**

## Arrow Functions to Make Coding Fun

Arrow functions help you to write functions very quickly. This feature is already available in other languages and known as [lambdas](https://en.wikipedia.org/wiki/Lambda_expression). 

Here's how we use arrow functions with `Array.map`: 

```js
var salary = [10000, 20000, 30000];
var with1000Increment = salary.map(x => x + 1000);
console.log(with1000Increment);
// > [11000, 21000, 31000];
```

> Live Code: https://goo.gl/Tc0BV4

If there is more than one argument in the function, we can write it like this:

```js
var marks = [89, 10, 70];
marks = marks.sort((a, b) =>  b - a);
console.log(marks);
// > [89,70,10]
```

> Live Code: https://goo.gl/08Ilik

## Arrow Functions to Avoid the "self" Madness

If you are writing JavaScript, I hope you know what "self" is and how ugly it is. We can easily avoid it with arrow functions. 

Here's a stupid example trying to `console.log` all the meta tags after 100 milliseconds:

```js
$('meta').each(function() {
    setTimeout(() => {
        console.log(this.name);
    }, 100);
});
```

> Live Code: https://goo.gl/xUrZSG

If there were no arrow functions, we would need to write it like this:

```js
$('meta').each(function () {
    var self = this;
    setTimeout(function () {
        console.log(self.name);
    }, 100);
});
```


Even though arrow functions are handy, **don't use** arrow functions everywhere. If you [use](https://goo.gl/bmQ3rJ) an arrow function for "each" callback in the above code block, you won't get the `this` context assigned by jQuery. So, use them with care.

## Improved Object Creation

Another useful feature in ES2015 is the improved object creation. 

Here is an example:

```js
var name = "Arunoda";
var user = {
    name,
    getAddress() {
        return "Colombo. Sri Lanka";
    }
};
```

> Live Code: https://goo.gl/9VMfoS

Before, you had to write it like this:

```js
var name = "Arunoda";
var user = {
    name: name, 
    getAddress: function() {
        return "Colombo. Sri Lanka";
    }
};
```

## Template Strings

This is one of my favorite features, which I used a lot in PHP. Now it's available in ES2015. Here's how we can concatenate a string without using the "+" operator:

```js
var name = "Arunoda";
var address = "Colombo, Sri Lanka";

var greeting = `My Name is ${name} and I live in ${address}`;
alert(greeting);
// Note the use of "`" charactor
```

> Live Code: https://goo.gl/zfUzWq

We can even write multiline strings without any issues:

```js
var blogPost = `
    ## My First Blog Post 
    
    I like to write in Markdown!   
`
```

> Live Code: https://goo.gl/GbbmHD

## Destructuring and Matching

With this feature, you can reduce the amount of code and self-document it. 

Let's say we have a user object and we are only interested in the `name` field. This is how we can do it with ES2015:

```js
var user = {name: "arunoda", address: "Colombo. Sri Lanka"};
var {name} = user;
console.log(name);
```

This seems kind of weird at first. But it’s very useful when you are working on a real app. Let's say I want to get the `target` of a click event. Here's how:

```js
$("body").click(function({target}) {
    console.log(`You clicked on ${target}`);
});
```

> Live Code: https://goo.gl/uFwzx8

You can also use this to self-document code when accepting an object into an API. For example, let’s say I have a function that accepts an object that has `name` and `address`. Then it prints a greeting. This is how we can do it with destructors:

    function GreetUser({name, address="N/A"}) {
      console.log(`${name}'s address is: ${address}`);
    }

    GreetUser({name: "Arunoda"});

> Live Code: https://goo.gl/OgWhrD

## Argument Spreading and the Rest Operator

In JavaScript, we can accept any number or arguments. But this feature is kind of difficult to handle. ES2015 makes it pretty simple. 

Let's implement a function like `Meteor.subscribe`:

```js
function MySubscribe(name, ...params) {
    var paramsString = params.join(", ");
    console.log(`Subscribing to ${name} with "${paramsString}"`);
}


MySubscribe("getPost", "meteor-category", "postId");
```

> Live Code: https://goo.gl/zLDEKi

You can also use the spread operator to pass an array of arguments to a function. See:

```js
function MySubscribe(name, ...params) {
    var paramsString = params.join(", ");
    console.log(`Subscribing to ${name} with "${paramsString}"`);
}

var params = ["meteor-category", "postId"];
MySubscribe("getPost", ...params); 
```

> Live Code: https://goo.gl/zAx2uf

## Other Features

There is a very nice way to create [classes](https://github.com/lukehoban/es6features#classes) and extend them in ES2015. But we are not fans of that syntax. However, this is totally subjective.

This is just a small set of our favorite (and easy to adapt) picks from ES2015. There are some features that fix issues in JavaScript (like [block scope](https://github.com/lukehoban/es6features#let--const) variables). Some features introduce completely new features like [generators](https://github.com/lukehoban/es6features#generators).

To learn more about them, visit this Github repo: <https://github.com/lukehoban/es6features>

## Start Using ES2015

If you need to use ES2015 with a Meteor app. It's pretty easy. First add the following package.

```
meteor add jsx
```

Then write ES2015 code in `.jsx` files.

> With Meteor 1.2, you can start using ES2015 without doing anything special. It's built in.

For other JavaScript apps, you can use babel directly. For that, refer [babel docs](https://babeljs.io/docs/setup/).

---

Try using ES2015 and I bet you'll get addicted to that.
