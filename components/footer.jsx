Components.Footer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {
      isPageGraphQL: FlowRouter.getRouteName() === "graphql"
    };
    return data;
  },
  render() {
    var style = "padding: 0 10px";
    if(this.data.isPageGraphQL) {
      return (
        <footer id="footer" className="graphql-footer" role="banner">
          <div className="graphql-footer-note">
            <a href="https://facebook.github.io/graphql/" target="_blank">GraphQL Website</a> 
            <a href="https://github.com/facebook/graphql" target="_blank">GraphQL Repo</a>

            <p>GraphQL is a trademark of Facebook Inc. <br/>
            KADIRA for GraphQL is an independant product from Kadira Inc. <br/>
            It has not been authorized, sponsored, or otherwise approved by Facebook Inc.</p>
          </div>

          <a href='/privacy_policy.html'>Privacy Policy</a>
          <a href='/terms_and_conditions.html'>Terms and Conditions</a>
        </footer>
      );
    } else {
      return (
        <footer id="footer" role="banner">
          <a href='/privacy_policy.html'>Privacy Policy</a>
          <a href='/terms_and_conditions.html'>Terms and Conditions</a>
        </footer>
      );
    }
  }
});