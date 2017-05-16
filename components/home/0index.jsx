Components.Home = React.createClass({
  selectTestimonial() {
    var index = Math.floor(Math.random() * this.props.testimonials.length);
    return this.props.testimonials[index];
  },
  getInitialState() {
    DocHead.setTitle("Kadira - Performance Monitoring Platform for Meteor");

    var title = 'Performance Management Platform for Meteor';
    var description = 'Kadira can help you to build fast & efficient Meteor apps. It can also track errors in your app even before your users notice that.';
    
    // for twitter
    DocHead.addMeta({name: 'twitter:card', content: 'summary_large_image', id: 'twitter:card'});
    DocHead.addMeta({name: 'twitter:site', content: '@kadirahq', id: 'twitter:site'});
    DocHead.addMeta({name: 'twitter:url', content: 'https://kadira.io', id: 'twitter:url'});
    DocHead.addMeta({name: 'twitter:title', content: title, id: 'twitter:title'});
    DocHead.addMeta({name: 'twitter:description', content: description, id: 'twitter:description'});
    DocHead.addMeta({name: 'twitter:image', content: 'https://cldup.com/aUSCtHP9El.png', id: 'twitter:image'});

    // for facebook
    DocHead.addMeta({name: 'og:type', content: 'website', id: 'og:type'});
    DocHead.addMeta({name: 'og:site_name', content: 'Kadira', id: 'og:site_name'});
    DocHead.addMeta({name: 'og:url', content: 'https://kadira.io', id: 'og:url'});
    DocHead.addMeta({name: 'og:title', content: title, id: 'og:title'});
    DocHead.addMeta({name: 'og:description', content: description, id: 'og:description'});
    DocHead.addMeta({name: 'og:image', content: 'https://cldup.com/aUSCtHP9El.png', id: 'og:image'});

    // SSR needs to send the same html to the client it generates
    // That's why we need to send a fixed one here
    // See below on when we change this just after rendered
    return {
      selectedTestimonial: this.props.testimonials[0]
    };
  },
  componentDidMount() {
    selectState = () => {
      this.setState({
        selectedTestimonial: this.selectTestimonial()
      });
    };
    
    // select the state right away.
    // this is not fired on the server
    selectState();
    this.testimonnialHandler = setInterval(selectState, 8000);
  },
  componentWillUnmount() {
    clearInterval(this.testimonnialHandler);
  },
  render() {
    return <main className="home">
      <Components.Home.ValueProposition />
      <Components.Home.SocialProof />
      <Components.Home.Features />
      <Components.Home.UserStories />
      <Components.Home.C2A />
    </main>
  }
});
