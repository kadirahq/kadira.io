---
navTitle: Taking a Server Side CPU Profile
title: Taking a Server Side CPU Profile
---

To take a server side CPU profile, you need to install the following two packages into your app.

* `meteorhacks:kadira-profiler`

Then run your app with the following environment variable.

```
export KADIRA_PROFILE_LOCALLY=1
```

* Then open your app in the browser and open the browser console.
* Now invoke this command: `Kadira.profileCpu(10)`
* It will profile your app for 10 seconds and save the profile to a temporary location.

Now visit the Kadira Debug [CPU profiling section](http://debug.kadiraio.com/debug?page=cpu-profiler) and load the saved profile.
