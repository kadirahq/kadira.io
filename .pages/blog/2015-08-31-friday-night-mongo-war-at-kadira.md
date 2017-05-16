title: Friday Night’s MongoDB War at Kadira
category: other
summery: We had a partial outage and a data loss. Here's the story and what we did to prevent it from happening again.
---

It was a scary Friday night and our data system had started to behave very strangely. After 8 hours of hard work, we brought the system back to its normal state but unfortunately we lost some of our data. 

This whole situation was due to some **wrong decisions** we made earlier. So this is **all on us** and no one else is to blame. To **avoid** this kind of issue in the future, we have taken some precautions. 

![](https://cldup.com/DAi2fO-Lf0.png)

Let me tell you the whole story. 

<hr/>

## Kadira's data architecture 

At Kadira, we use MongoDB to store metrics and other data we collect. We are using MongoDB 3.x with wiredTiger. We have more than 500 GB of data and it's growing. 

To render charts very quickly in the [Kadira UI](http://ui.kadira.io/), we pre-aggregate metrics. For this, we use aggregation pipelines and map reduce. 

## So what happened?

We had been using a MongoDB replica set without sharding the data. We had big SSDs with enough space, but our CPU capacity weren't enough. 

So, we added a new instance to the existing replica set with a high CPU capacity. That was the starting point of the madness. 

Suddenly, the CPU usage of the master started to grow. I think that was due to sending data to the new replica. Things then became pretty bad and the master was going down and starting up again. This crashed the data in the master. That means, it went completely dark.

Then our cluster chose another master and the same thing happened again. But we were able to stop it before it destroyed all of the data.

Our other instance in the replica is a [delayed node](https://docs.mongodb.org/manual/tutorial/configure-a-delayed-replica-set-member/) (12 hours), which has older data. (We used that as a backup.)

So, in this situation our pre-aggregation tools went crazy and they removed all of our metrics related to the Meteor method. We turned everything off and started to build a new replica from what we had. 

With all this drama, we lost a bunch of data and had a partial downtime. That was unfortunate and we are extremely sorry. I **assure** you that we have done our best to avoid something like this happening again. 

## So, what was the root cause?

Basically, this happened due to some bad decisions we made. Here they are:

* Using a delayed node as the only backup solution
* Not upgrading CPUs early enough
* Not having a sharded system

## What we did to prevent this happening again 

### New backup system

We really need to have a good backup system. Using something like [`mongodump`](http://docs.mongodb.org/manual/reference/program/mongodump/) is not going to work for a database like ours. We are starting to use [MMS backup](https://mms.mongodb.com/).

### Sharding

Now we are working on a sharding system and it will go live by next week. For this, we are not using MongoDB's default sharding mechanism. That's because it requires more administration and it has some hiccups. Our team also does not have experience on managing a MongoDB shard. 

But we know our data patterns and how our user base is growing. So, we decided to shard manually in the app layer. 

Basically, we run a pool of replica sets. When a new app is created on Kadira, we select a replica set from the pool. That's the shard for the metric in that app. Then we save a reference to it in a different DB, which only has app-related data. We choose the replica by the amount of disc space used by the replica sets. 

So after that, when reading and writing data for a particular app, it first checks the app info, gets the relevant replica set and uses it. 

This is the simplest possible solution. It works great for us and we don't need to migrate anything. We can also add more capacity to our dataset by adding a new replica set. We don't need to do any re-balancing after we add a new replica set to the pool.

I'll do a blog post after we've deployed the new sharding system.

