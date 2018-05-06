routes = [{
    name: 'home',
    path: '/',
    url: './home.html',
    options: {
      animate: false,
    }
  },
  {
    path: '(.*)',
    url: './pages/404.html'
  }
];