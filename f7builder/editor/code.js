$$(document).on('click', '#btn-run-electron', function() {
    let runWindow

    runWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'img/favicon.png')
    })

    runWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'pages/index.html'),
        protocol: 'file:',
        slashes: true
    }))
});