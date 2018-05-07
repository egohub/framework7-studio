const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const path = require('path')
const url = require('url')
const fs = require('fs')

app.on('ready', function() {
    let studioWindow

    studioWindow = new BrowserWindow({
        width: 1204,
        height: 700,
        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    })

    studioWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'f7builder/editor.html'),
        protocol: 'file:',
        slashes: true
    }))

    var template = [{
        label: "File",
        submenu: [{
            label: "Exit",
            click: function() {
                app.quit()
            }
        }]
    }, {
        label: "View",
        submenu: [{
            label: "Reload",
            click: function() {
                studioWindow.webContents.reload();
            }
        }]
    }, {
        label: "Tools",
        submenu: [{
            label: "Developer Tools",
            click: function() {
                studioWindow.webContents.openDevTools()
            }
        }]
    }]

    var menu = Menu.buildFromTemplate(template);
    studioWindow.setMenu(menu);

    studioWindow.on('closed', function() {
        studioWindow = null;
    });
});

app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    //if (process.platform !== 'darwin') {
    //    app.quit()
    //}
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (editorWindow === null) {
        createWindow()
    }
});