Components.Genie.Intro = React.createClass({
  render() {
    return (
      <div className="genie container">
        <div className="logo">
          <img src='/images/genie-maskot.jpeg'/>
          <h1>Kadira Genie</h1>
          <h2>A Personal Assistant Who Looks After Your Meteor App</h2>
        </div>

        <div className="value-prop">
          <h3>He will monitor your app for performance and security issues, 24/7.</h3>
          <h3>He will help you to optimize your app.</h3>
        </div>

        <div className="main-feature">
          <h2>What Does Kadira Genie Do?</h2>
          <div className="sub-feature">
            <h3>He will monitor your app for <b>performance</b> and <b>security</b> issues, <b>24/7</b></h3>
            <p>
              He will find issues in your app and suggest what to do. He can even figure out <b>potential issues</b> before they become real.
            </p>
            <p>
              Here are a few things Kadira Genie does:
            </p>
            <ul>
              <li>Investigate sudden <b>response time</b> & <b>CPU</b> spikes.</li>
              <li>Help you to optimize <b>slowest</b> methods and publications.</li>
              <li>Identify <b>CPU</b> intensive publications and help you to optimize them.</li>
              <li>Discover <b>memory leaks</b> and help you to fix them.</li>
              <li>Help you to <b>load test</b> your app.</li>
              <li>Analyze <b>errors</b> in your app and help you to fix them.</li>
              <li>Find out <b>real user</b> latency issues and help you to fix them.</li>
              <li>Audit your app for common <b>security issues</b> & help you to fix them.</li>
            </ul>
            <p>
              This is just a few of the <b>various tasks</b> Kadira Genie does.
            </p>
            <p>
              <br />
              <em>
                Most importantly, Kadira Genie will takes care of the performance.
                <br/>
                So, you can focus on building your awesome product.
              </em>
            </p>
          </div>
        </div>

        <div className="main-feature">
          <h2>How does Kadira Genie work?</h2>
          <p>
            Kadira Genie is backed by a group of <b>human experts</b> and a set of <b>automated tools</b>, which use every metric, trace, and CPU and memory profiles collected from your app. Based on these, the tools will understand and detect issues.
          </p>
          <p>
            Then our human experts will <b>verify</b> those issues and find <b>solutions</b> with the help of the tools.
          </p>
          <div className="sub-feature">
            <h3>Awesome. How can I get Kadira Genie?</h3>
            <p>
              Simple. Kadira Genie is available for everyone who uses a <b>paid</b> Kadira plan. We have a very simple pricing plan:
            </p>
            <p>
              <em>It’s $990 per month/ per app</em>
            </p>
            <p>
              <a href="https://arunoda.typeform.com/to/rH1eVQ" target="_blank" className="buy-link">Contact us to Get Started.</a>
            </p>
          </div>

          <div className="sub-feature">
            <h3>Oh! That's costly.</h3>
            <p>
              Hmm. Kadira Genie is <b>an expert</b> who knows how to optimize your app. He has <b>years</b> of experience building Meteor apps and helping Meteor developers at Kadira.
              <br />
              He will look after your app every day and he never sleeps.
            </p>
            <p>
              All of these benefits come for just a <b>fraction</b> of your monthly development cost.
            </p>
            <p>
              What would happen if you had <b>an issue</b>? How much engineering effort would it take to find and fix it. With Kadira Genie, you won't need to <b>waste</b> those precious resources.
            </p>
            <p>
              <em>
                Actually, Kadira Genie will help your fix issues before they became real.
                <br/>
                He’ll let you reduce your growing maintenance budget.
              </em>
            </p>
            <p>
              <a href="https://arunoda.typeform.com/to/rH1eVQ" target="_blank" className="buy-link">Contact us to get started.</a>
              <br/>
              (We have a limited slots available during the private beta period.)
            </p>
          </div>
        </div>
      </div>
    );
  }
});
