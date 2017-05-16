Components.Pricing = React.createClass({
  componentDidMount() {
    DocHead.setTitle("Kadira Pricing Plans");
  },
  render() {
    return (
    <div className="content-area">
      <div className="container">
        <div className='post'>
          <div style={{margin: "40px 0 20px 0"}}>
            <div className="col-sm-8 col-sm-offset-2">
              <table className="table table-plans">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Minimum Hosts per Month</th>
                    <th>Data Retention (History)</th>
                    <th>Per Host Cost</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="plan-free">
                    <td>Free</td>
                    <td>-</td>
                    <td>24 Hours</td>
                    <td>Free</td>
                    <td><a href="https://ui.kadira.io/sign-up" className="btn btn-block btn-plan">Sign Up</a></td>
                  </tr>
                  <tr className="plan-startup current">
                    <td>Startup</td>
                    <td>5</td>
                    <td>2 Weeks</td>
                    <td>$10</td>
                    <td><a href="https://ui.kadira.io/sign-up" className="btn btn-block btn-plan">Sign Up</a></td>
                  </tr>
                  <tr className="plan-pro">
                    <td>Pro</td>
                    <td>15</td>
                    <td>3 Months</td>
                    <td>$10</td>
                    <td><a href="https://ui.kadira.io/sign-up" className="btn btn-block btn-plan">Sign Up</a></td>
                  </tr>
                  <tr className="plan-business">
                    <td>Business</td>
                    <td>45</td>
                    <td>3 Months</td>
                    <td>$8</td>
                    <td><a href="https://ui.kadira.io/sign-up" className="btn btn-block btn-plan">Sign Up</a></td>
                  </tr>
                  <tr className="plan-custom">
                    <td colSpan="5">
                      <a href='mailto:hello@meteorhacks.com'>Contact us</a> for tailor-made custom plans.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="row">
          <div className="col-sm-4 col-sm-offset-2 free-plan-feature-summery">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">All Kadira plans come with</h3>
              </div>
              <div className="panel-body">
                <ul className="list-features">
                  <li>Access to Metrics and Traces</li>
                  <li>Create any number of apps</li>
                  <li>Error Tracking</li>
                  <li>Instant support via email </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-4 paid-plans-feature-summery">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">All paid plans come with</h3>
              </div>
              <div className="panel-body">
                <ul className="list-features">
                  <li>Unlimited Collaborators</li>
                  <li>Unlimited Alerts</li>
                  <li>CPU Profiling</li>
                  <li>Monitoring Observers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h1 id='common-questions'>Common Questions</h1>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>What is a host?</h3>
            <p>{"Host is a single application process in your app. Different hosting providers give different names to that. Containers, servos, dynos, drones, hosts are few of those names."}</p>
            <p>{"Kadira collects data from every hosts in your app. That's why we charge based on the number of hosts available in your app."}</p>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>What's the algorithm use to calculate the host usage?</h3>
            <p>
              First we get a list of host usage for your app, aggregated for <b>an hour</b>. We take it for your current billing month. That means there are around 720(24 * 30) values for an app. Then, we take the <b>median</b> of those values for each app. We aggregate those medians and that's your monthly host usage.
            </p>
            <p>That means, number of hosts usage stays the same even if your app had a sudden spike in the usage or you load tested your app.</p>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>What is Data Retention?</h3>
            <p>{"Data Retention indicates the period of time we keep your application data with us."}</p>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>Can I change plans?</h3>
            <p>{"Of course you can change plans anytime."}</p>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>Tell me more about Collaborators?</h3>
            <p>{"You can simply allow other members in your team to use Kadira UI to monitor and optimize your app. You can change the ownership to another user as well."}</p>
            <p>{"Collaborators can be added to any app, but there is no way to add account-level collaborators."}</p>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>What are Alerts?</h3>
            <p><a href='https://kadira.io/blog/stay-alert-with-your-meteor-app/'>Kadira Alerts</a> {"sends you a notification when something strange happens with your app. You can set alerts for almost every metric available in Kadira."}</p>
          </div>
        </div>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <h3>What is Error Tracking?</h3>
            <p>Kadira <a href='https://kadira.io/blog/awesome-error-tracking-solution-for-meteor-apps-with-kadira/'>tracks</a> both server and client errors for you automatically. You can use Kadira UI to analyze error traces and understand them.</p>
          </div>
        </div>

        <hr/>

        <div className="row row-questions">
          <div className="col-sm-8 col-sm-offset-2 col-question">
            <p>Do you have any other questions? <a href='http://support.kadira.io'>Please ask!</a></p>
            <p>We are happy to help you out.</p>
          </div>
        </div>
      </div>
    </div>
  );}
});
