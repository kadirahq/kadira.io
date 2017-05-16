// We need to scroll to the top automatically for
// route change. That feels nice
FlowRouter.triggers.enter([Triggers.jumpToPrevScrollPosition]);
FlowRouter.triggers.exit([Triggers.saveScrollPosition]);
FlowRouter.triggers.enter([Triggers.sendPageToGa]);

['/', '/mup'].forEach(function(path) {
  FlowRouter.route(path, {
    name: "home",
    action() {
      var props = {
        testimonials: TestimonialsData,
        features: FeaturesData
      };
      ReactLayout.render(MainLayout, {
        main: <Components.Home {...props}/>
      });
    }
  });
});

FlowRouter.route('/pricing', {
  action() {
    ReactLayout.render(MainLayout, {main: <Components.Pricing />});
  }
});

FlowRouter.route('/platform/:setName?/:page?/:subNav?', {
  name: 'platform',
  action() {
    var props = {
      category: 'platform',
      titlePostfix: 'Kadira Platform',
      showOnlyFirstPage: true
    };
    ReactLayout.render(MainLayout, {main: <Components.PageManager {...props}/>});
  }
});

FlowRouter.route('/blog/:category?/:slug?', {
  action(params) {
    ReactLayout.render(MainLayout, {
      main: <Components.Blog {...params}/>
    });
  }
});

FlowRouter.route('/academy', {
  action() {
    ReactLayout.render(MainLayout, {main: <Components.Academy />});
  }
});

FlowRouter.route('/genie', {
  name: "genie",
  action() {
    ReactLayout.render(MainLayout, {main: <Components.Genie />});
  }
});

FlowRouter.route('/academy/:courseName/:setName?/:page?/:subNav?', {
  name: 'academy-courses',
  action(params) {
    var props = {
      category: params.courseName,
      titlePostfix: slugToText(params.courseName),
      pathPrefix: "/academy"
    };
    ReactLayout.render(MainLayout, {main: <Components.PageManager {...props}/>});
  }
});

FlowRouter.route('/academy/:slug?', {
  action(params) {
    ReactLayout.render(MainLayout, {
      main: <Components.AcademyList {...params}/>
    });
  }
});

FlowRouter.route('/:slug', {
  action(params) {
    params.slug = params.slug.replace('.html', '');
    ReactLayout.render(MainLayout, {
      main: <Components.OtherPage {...params}/>
    });
  }
});

function scrollToTop() {
  $("body").animate({scrollTop: 0}, 0);
}

function slugToText(slug) {
  var text = slug.split('-').map(function(w) {
    var firstChar = w.charAt(0).toUpperCase();
    var rest = w.substring(1);
    return firstChar + rest;
  }).join(' ');

  return text;
}
