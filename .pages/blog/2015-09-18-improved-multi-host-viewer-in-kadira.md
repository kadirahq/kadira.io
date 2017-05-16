title: Improved Multi Host Viewer In Kadira
category: product
summery: Now it's very easy to compare and analyze individual hosts in your app, even it has 1000 hosts.
---

In Kadira, multi host viewer is very handy to visualize the performance of individual hosts(or instances) in your app. But, if your app has a lot of hosts, Kadira couldn't show them correctly.

See:

![Kadira Multi Host Support](https://cldup.com/JHPR54GDIG.png)

That's was one of our most requested feature (or bug report). So, in the past couple of weeks, our team worked on this issue now we've a perfect solution. Let's have a look at it.

Watch this video:

<iframe width="640" height="360" src="https://www.youtube.com/embed/ZEpkPveaezY?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen="1">
</iframe>

## How We Build This?

We use [HighCharts](http://www.highcharts.com/) to render the chart just like other parts in Kadira. For the hosts list in the fullscreen view, we use React (with Meteor). We need it to be very fast even when there are huge number of hosts.

We learned a lot while we are building this component. We'll publish a blog post on how we built it and some lessons we learned.

<hr />

Don't forget to try out this feature.
