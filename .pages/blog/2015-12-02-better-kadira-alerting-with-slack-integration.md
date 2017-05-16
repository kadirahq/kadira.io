title: Introducing New Kadira Alerts: Slack Integration, Context Awareness and More
category: product
summery: Now we have a whole new alert system. It can trigger alerts accurately and comes with useful features like Slack integration and context awareness.
---

We’ve had an alerting system since the very early days of Kadira, but it did not work properly and triggered false positive alerts. This was due to the poor design and the lack of schema for our inter-service communication.

We've re-written our alerting system based on our new [GraphQL](https://learngraphql.com/) data layer, and now it can handle alerts more accurately. It also comes with a few useful features, which I’ll introduce here.

## Slack Integration

Now you can forward alerts notifications to Slack. Since [Slack](https://slack.com/) is often used for company-wide communication, we hope this will be a killer feature. Once configured, you can get alerts like this:

[![Kadira Alerts & Slack Integration](https://cldup.com/RV0qRWqlS4.png)](https://cldup.com/RV0qRWqlS4.png)

Integrating with Slack is pretty simple. Just generate an incoming Webhook and use it as a Webhook when creating a Kadira Alert. Follow [this guide](http://support.kadira.io/knowledgebase/articles/785625-kadira-alerts-slack-intergration) for more information.

## Context Awareness

Now our alerting system knows about the context and can give you useful information. Here's how it works:

* When the alert is triggered, we'll fire notifications.
* A notification contains a human-friendly message with information related to the incident. For an example, take a look at the following message:

![Kadira Alerts - Context Awareness](https://cldup.com/GbBGheT0zy.png)

* It also contains a link to the Kadira dashboard (based on the rule you defined), where you can get more details about the incident.
* Once you fix the incident, we'll fire notifications again as the alert has cleared.

## More Alert Metrics

We've recently introduced more features to Kadira, like "Live Query" monitoring support. Now you can create alerts for all these new metrics.

![Kadira Alert Metrics Types](https://cldup.com/kXGFSHlc_X.png)

## Notification in the Kadira UI

Now you can see a small notification in the Alerts window if an alert is fired. 

![Kadira Alert Notification on the UI](https://cldup.com/vMBy0hCg1f.png)

With this, you can know about armed alerts in your app at a glance.

<hr />

This is the **best** part. All these features are available for every app in Kadira. If your app is a FREE app, you can create up to five alerts. Otherwise, you can create as many as alerts you like.

**Try the new Kadira alerts and be notified when something crucial has happened.**