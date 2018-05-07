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
    }
});

var view_main = app.views.create('#view-main', {
    url: '/'
});