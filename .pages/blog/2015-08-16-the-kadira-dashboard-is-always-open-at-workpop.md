---
layout: blog_post
title: The Kadira Dashboard is Always Open at Workpop
category: user-story
summery: Workpop heavily relies on Kadira. This is how they use Kadira. 
---

>“The Kadira dashboard is always open at Workpop.” 

This is a quote from the Workpop’s VP of Engineering, [Luis Bitencourt-Emilio](https://www.linkedin.com/in/luisatlive).

## What is Workpop?

[Workpop](https://beta.workpop.com) is an online job marketplace for the service industry in the United States. Currently it serves the Los Angeles area and it has plans to expand nationwide early next year.

Workpop believes that the way people find work and hire in the service industry is broken. 

[![Workpop](https://cldup.com/LRRlwgrcU9.jpg)](https://beta.workpop.com)

For candidates in the service industry, there is fierce competition for each job. After they submit their application, they almost never hear anything back. And without any feedback on their application, there is no way for them to learn or improve.

Employers suffer from incredibly high turnover and receive hundreds of applications for each position (most are still sent via email through Craigslist).

**Workpop is working to solve these problems through modern design, machine learning and a powerful recommendation platform.**

The company was founded in 2014 with investment from SV Angel, Obvious Ventures, Slow Ventures, Joe Lonsdale (Palantir), Aaron Levie (Box), Evan Williams (Twitter, Medium), Biz Stone (Twitter, Jelly), David Tisch, and Dave Morin (Path) among many others.

Visit <https://beta.workpop.com> to learn more about the platform.

> Visit their [careers](https://beta.workpop.com/careers) page if you’re interested in joining the growing team!

## How does Workpop uses Kadira?

Workpop started to use Kadira even before it released the app to the public. That proves it’s a good idea to use a performance monitoring service like Kadira, even at the **very early stage**. Then, you don’t need to worry about performance when it’s prime time.

We talked to [Luis Bitencourt-Emilio](https://www.linkedin.com/in/luisatlive), VP of Engineering at Workpop, and asked him about how they are using Kadira. This is what Luis told us:

> Our Kadira dashboard is always open at Workpop. We constantly monitor live-site performance via Kadira.

> Whenever we see spikes or when users complain about performance issues, we use Kadira [traces](https://kadira.io/platform/kadira-apm/traces) to dig deep into what's happening and quickly correlate the code that's causing it. 

![How Workpop Uses Kadira](https://cldup.com/rFCLvbk35f.jpg)

> We've fixed numerous performance issues that were originally found through Kadira.

He also added:

> Most importantly, the Kadira team has been outstanding in quickly responding to all issues we've run into. Some of them have nothing to do with Kadira yet they’ve gone out of their way to help us whenever possible.

### Error Tracking with Kadira

Workpop is also a fan of Kadira’s [Error Manager](https://kadira.io/platform/kadira-error-manager/overview). They recently fixed a client-side issue that was very hard to debug. Luis shared his experience with us:

> We've been seeing client-side errors slowly increase, particularly around two errors. Then they started firing way too often for our comfort so we looked at it a bit more. 
> 
> By using the Kadira error view, I tracked down the day that it started, then the days it became worst and correlated it to our releases. 

![Workpop is also a fan of Kadira’s Error Manager](https://cldup.com/GVhILZ4CaV.png)

> With some research, we found the Meteor [bug](https://github.com/meteor/meteor/issues/4793) we were hitting and our commit which exacerbated it. Then we simply did a hotfix.

## Kadira’s open-source projects at Workpop

Other than Kadira APM and Error Manager, Workpop uses a lot of our open-source projects, including:

* [Kadira Debug](https://kadira.io/platform/kadira-debug/overview)
* [Async](https://github.com/meteorhacks/meteor-async)
* [Fast Render](https://github.com/meteorhacks/fast-render)
* [Subs Manager](https://github.com/meteorhacks/subs-manager)
* [Unblock](https://github.com/meteorhacks/unblock/)

At the end of our chat, Luis said:

> Hmm. We're big customers it seems :)

<hr />

To learn more about the [Kadira platform](https://kadira.io/platform), visit [here](https://kadira.io/platform).