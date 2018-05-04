var $$ = Dom7;

var app = new Framework7({
    root: '#app',
    id: 'com.framework7.studio',
    name: 'framework7 Studio',
    theme: 'auto',
    routes: routes,
    touch: {
        fastclick: true,
        materialRipple: false
    },
    panel: {
        leftBreakpoint: 960,
    }
});

var view_main = app.views.create('.view-main', {
    url: '/'
});

var view_left = app.views.create('.view-left', {
    url: '/'
});