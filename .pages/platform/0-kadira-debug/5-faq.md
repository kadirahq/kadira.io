---
navTitle: FAQ
navSubTitle: Frequently Asked Questions
title: Kadira Debug - Frequently Asked Questions
---

### How does Kadira Debug work?

Kadira Debug UI directly connects to your locally running app via DDP. Then it can collect data from both your server and the browser and display it in a nice interface. If you'd like to learn more, have a look at [this](https://github.com/kadirahq/meteor-debug) repo.

### Does Kadira Debug affect the performance of my app?

Not necessarily. Kadira Debug collects, aggregates and sends data in an effective way. So, it won't add any noticeable overhead to your app. If it does, open [an issue](https://github.com/kadirahq/meteor-debug/issues). We'd love to fix it.

### Is Kadira Debug secure?

Kadira Debug is a `debugOnly` package. It will not go into the production build of your app. It also does not send or route data outside of your machine. Kadira Debug UI directly connects to your app via DDP. No proxies. No hacks.

### Why isn't Kadira Debug UI using HTTPS?

Did you notice we're using a different domain for Kadira Debug? Here it is: http://debug.kadiraio.com/debug. That's because of a security feature of modern browsers.

Browsers restrict HTTPS web pages from accessing non-HTTPS content. So, if we serve Kadira Debug on a `*.kadira.io` domain with HTTPS, we can't connect to localhost. That's why we're using a seperate domain without HTTPS.

This is secure since we don't communicate with Kadira Servers inside Kadira Debug. Even if we do it in the future, we'll use some other techniques to make sure the DDP connection is always secure.

### Is Kadira Debug Open Source?

Yes and No. Checkout [this](https://github.com/kadirahq/meteor-debug) repo. It's the core of Kadira Debug and how we collect data. It's open source under MIT license. But, our Kadira Debug UI is not open source.

### What if I don't have a Kadira Account?

You don't need to have a Kadira or Meteor Account to use Kadira Debug.

### Does Kadira Debug work with Nitrous.io or in the cloud?

Yes, it does. In "Nitrous.io", your app runs as a dev app. So, it'll work. Just enter the app URL. Likewise, it'll work with any other cloud development environment. Additionally, Kadira Debug also works if you deploy your app with the debug mode (--debug flag).

### Will Kadira Debug support React?

React is becoming the standard for UI components. Meteor is supporting it officially soon. React support is planned and we'll have it soon.

### I've a different question?

Submit an issue on [Kadira Debug](https://github.com/kadirahq/meteor-debug) repo. If you need to send us a private message, send it to support@kadira.io.