title: Meteor’s Live Query Monitoring in Kadira
category: product
summery: Now you can see what's happening inside your Live Queries with Kadira.
---

You can get a lot of runtime information about your app using Kadira. But until today, there hasn’t been a way to see what's happening inside your Live Queries once they've been created. 

> Meteor's Live Query system is one of the core components of Meteor. When you return a cursor from a publication, a new Live Query is created.

In order implement the Live Query system, Meteor needs to watch the DB for changes. Meteor tries to use the MongoDB oplog to do so in an efficient manner, but this is still one of the major factors in your app’s CPU usage.

## Monitoring Live Queries with Kadira

[![Monitoring Meteor Live Queries with Kadira](https://cldup.com/0BNXNeDcnn.png)](https://ui.kadira.io/apps/AUTO/dashboard/live_queries)

Now, you can monitor what's happening inside your Live Queries very easily with Kadira. For example, you can see the number of documents fetched by each publication.

You can also see all the changes detected by Live Queries as well as the total oplog notifications they've processed.

You can follow [this guide](https://kadira.io/academy/meteor-performance-101/content/optimizing-your-app-for-live-queries) to understand these metrics and try to optimize your app based on them.

## Available for all Kadira Apps

Live Query monitoring is available for all the apps in Kadira. You may need to update `meteorhacks:kadira` to the latest version. Do so with:

```
meteor update meteorhacks:kadira@2.26.3
```

<hr />

We hope this will give you more visibility into your app and help you to debug performance issues and optimize your app more easily.
