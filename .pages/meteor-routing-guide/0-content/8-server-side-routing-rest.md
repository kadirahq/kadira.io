---
navTitle: 
navSubTitle: Server Side Routing / REST APIs
title: Server Side Routing / REST APIs
enableComments: true
---

For most of the Meteor apps, we don't need to implement server side routing functionality. That's because we utilize Meteor's DDP protocol for data. Meteor automatically, does the hard work for us.

But, we may need server side routing to interact with non meteor apps or implement webhooks.

> Flow Router is a client side router and it does not have Server Side Routing capability. It has no plans to implement such features either.
>  
> That's because client side and server side routing is fundamentally two different things. So, mixing both into an one project only complex that project and does add direct value.
> 
> But, Flow Router cares about Server Side Rendering and we've [already](https://github.com/meteorhacks/flow-router/tree/ssr) started on that. With that, we'll have features to,
> * Render pages on the server
> * Handle 404 pages correctly
> * Handle proper 301/302 redirects
> * Generate titles/meta tags on the server

## Related Projects

There are plenty of projects we can used for Server Side Routing and building REST apis. Here's a list of some key projects:

* [Picker](https://github.com/meteorhacks/picker/) - It's a connect middleware compatible server side router for Meteor
* [Restivus](https://atmospherejs.com/nimble/restivus) - It's an easy way to create REST apis
* [simple:rest](https://atmospherejs.com/simple/rest) - It's simple option to build JSON APIs for existing Meteor methods and publications

Refer this MeteorPedia [article](http://meteorpedia.com/read/REST_API) for other solutions.