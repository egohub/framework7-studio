const spawn = require('child_process').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const prompt = require('electron-prompt');

var file_open_active = '';

var editor = grapesjs.init({
    container: '#gjs',
    height: '100%',
    canvas: {
        styles: ['f7/css/framework7.css', 'f7/css/card.css', 'css/icons.css'],
        scripts: ['f7/js/framework7.js', 'f7/js/app.js']
    },
    allowScripts: 1
});

var config = editor.getConfig();

var blockManager = editor.BlockManager;

var command = editor.Commands;

var panel = editor.Panels;

config.showDevices = 0;

fs.readFile(path.join(__dirname, 'temp.html'), 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.readFile(path.join(__dirname, 'pages/' + data), 'utf-8', (err, cb_data) => {
        if (err) {
            console.log(err);
            return;
        }
        editor.setComponents(cb_data);
    });

    file_open_active = data;
});