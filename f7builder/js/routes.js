routes = [{
        name: 'home',
        path: '/',
        url: './home.html',
        options: {
            animate: false,
        }
    },
    {
        name: 'product',
        path: '/product/',
        url: './product.html',
        options: {
            animate: false,
        }
    },
    {
        path: '(.*)',
        url: './pages/404.html'
    }
];