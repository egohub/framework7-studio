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

var view_main = app.views.create('#view-main', {
    url: '/'
});

var view_left = app.views.create('.view-left', {
    url: '/'
});

$$(document).on('click', '#btn-design-html', function() {
    var fileName = $$(this).attr('data-file');

    fs.readFile(path.join(__dirname, 'pages/' + fileName), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    });
});