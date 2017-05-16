var headerLinks = [
  {caption: "Kadira Platform", type: "platform", link: "/platform"},
  {caption: "Genie", type: "genie", link: "/genie"},
  {caption: "Pricing", type: "pricing", link: "/pricing"},
  {caption: "Blog", type: "blog", link: "/blog"},
  {caption: "Academy", type: "academy", link: "/academy"},
  {caption: "Support", type: "docs", link: "http://support.kadira.io"},
  {caption: "Sign Up for Kadira", type: "login", link: "https://ui.kadira.io/sign-up"},
];

Components.Header = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {
      isHome: FlowRouter.getRouteName() === "home",
      isPageGenie: FlowRouter.getRouteName() === "genie"
    };
    return data;
  },
  moveToHome() {
    FlowRouter.go('/');
  },
  changeSignUpButtonWithLoginState() {
    var signUpLink = _.last(headerLinks);
    var loginStateCookie =
      Meteor.settings && Meteor.settings.public &&
      Meteor.settings.public.loginState &&
      Meteor.settings.public.loginState.cookieName;

    if(loginStateCookie) {
      var state = LoginState.get(loginStateCookie);
      if(state) {
        signUpLink.caption = "Open Dashboard";
        signUpLink.link = state.url;
        this.forceUpdate();
      }
    }
  },
  componentDidMount() {
    this.changeSignUpButtonWithLoginState();
  },
  render() {
    var kadiraLogo = "/images/kadira-logo-small-black.png";
    var classNames = "navbar navbar-default";
    var brandDesc = "Performance Monitoring for Meteor";

    if(this.data.isHome) {
      classNames += " home";
      kadiraLogo = "/images/kadira-logo-small-white.png";
    }

    if(this.data.isPageGenie) {
      classNames += " genie";
      kadiraLogo = "/images/kadira-logo-small-black.png";
      brandDesc = "Kadira Genie";
    }

    return (
      <header id="header" className={classNames} role="banner">
        <div className='container'>
          <div className="navbar-header">
            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div id="navbar-brand" onClick={this.moveToHome}>
              <h1 className='brand-title'><img className='brand-logo' src={kadiraLogo} /></h1>
              <h2 className='brand-desc'>{brandDesc}</h2>
            </div>
          </div>
          <div id="navbar" className='collapse navbar-collapse apm-navbar-collapse clearfix' role='navigation'>
            <ul className="nav navbar-nav pull-right">
              {headerLinks.map(function(page) {
                var className = "";
                if(FlowRouter.current().path.match(page.link)) {
                  className="selected-link"
                }
                var classNameMobile = className + " visible-xs-block";
                var classNameDesktop = className + " hidden-xs";
                var id = "toplink-" + page.type;

                if(page.caption === "Sign Up for Kadira") {
                  return (
                    <li key={id}>
                      <a className={classNameDesktop} href={page.link} id={id}>{page.caption}</a>
                      <a className={classNameMobile} href={page.link} id={id} data-toggle="collapse" data-target="#navbar">{page.caption}</a>
                      <a className={classNameDesktop} href="https://ui.kadira.io/sign-in" id="sign-in-tag">OR SIGN IN</a>
                    </li>
                  )
                }
                return (<li key={id}>
                  <a className={classNameDesktop} href={page.link} id={id}>{page.caption}</a>
                  <a className={classNameMobile} href={page.link} id={id} data-toggle="collapse" data-target="#navbar">{page.caption}</a>
                  </li>)
              })}
            </ul>
          </div>
        </div>
      </header>
    );
  }
});
