---
layout: blog_post
title: Multi Chart Selection in Kadira
category: product
summery: Now we've a small but very useful feature which is commonly known used with Small Multiples.
authorName: Pahan Sarathchandra
authorProfile: https://twitter.com/pahans
---

Today we are introducing a small feature to make kadira user's lives easier. We designed kadira UI with ["small multiple"](https://en.wikipedia.org/wiki/Small_multiple) data visualization technique from the beginning. But, it lacks multi chart selection.

"Small multiple" is a series of similar graphs or charts using the same scale and axes. It makes comparisons easier having all data displayed in a smaller area. 

> In order to make it more useful, we need to have multi chart selection functionality for all the charts. Now Kadira has that functionality.

<img 
    src="https://cldup.com/9hhfW0tRtr.jpg" 
    alt="Small Multiples in Kadira" 
    data-gif="https://cldup.com/_k9vvCqaxS.gif" />

Visit [Kadira Dashboard](https://ui.kadira.io/) and experience it with your app.

### How we've implemented that?

We use [](http://www.highcharts.com/products/highcharts)[highcharts](http://www.highcharts.com/products/highcharts) for all our time charts. What we are doing is adding a [plot line](http://api.highcharts.com/highcharts#Axis.addPlotLine) on mouse over  and triggering hover state programatically. 

### Got Suggestions?

We love your feedback, Please comment here or drop us an email. 