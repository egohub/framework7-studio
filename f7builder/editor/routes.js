routes = [{
    name: 'editor_code',
    path: '/',
    url: './editor_code.html',
    options: {
        animate: false,
    }
}, {
    path: '(.*)',
    url: './pages/404.html'
}];
