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
        editorWindow = null;
    });
    //let mainWindow
    //
    //function mainApplication() {
    //    mainWindow = new BrowserWindow({
    //        width: 800,
    //        height: 600,
    //        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //    })
    //
    //    mainWindow.loadURL(url.format({
    //        pathname: path.join(__dirname, 'f7builder/index.html'),
    //        protocol: 'file:',
    //        slashes: true
    //    }))
    //
    //    var template = [{
    //        label: "File",
    //        submenu: [{
    //            label: "Exit",
    //            click: function() {
    //                app.quit()
    //            }
    //        }]
    //    }, {
    //        label: "View",
    //        submenu: [{
    //            label: "Reload",
    //            click: function() {
    //                mainWindow.webContents.reload();
    //            }
    //        }]
    //    }, {
    //        label: "Tools",
    //        submenu: [{
    //            label: "UI Builder",
    //            click: function() {
    //                mainBuilder();
    //            }
    //        }, {
    //            label: "UI Extra",
    //            submenu: [{
    //                label: "Action Sheet",
    //                click: function() {
    //                    actionsheetWindow = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //
    //                    actionsheetWindow.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_actionsheet.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                actionsheetWindow.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //
    //                    var menu = Menu.buildFromTemplate(template);
    //                    actionsheetWindow.setMenu(menu);
    //                }
    //            }, {
    //                label: "Calender/Datepicker",
    //                click: function() {
    //                    calenderWindow = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //
    //                    calenderWindow.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_calender.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                calenderWindow.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //
    //                    var menu = Menu.buildFromTemplate(template);
    //                    calenderWindow.setMenu(menu);
    //                }
    //            }, {
    //                label: "Dialog",
    //                click: function() {
    //                    dialogWindow = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //
    //                    dialogWindow.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_dialog.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                dialogWindow.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //
    //                    var menu = Menu.buildFromTemplate(template);
    //                    dialogWindow.setMenu(menu);
    //                }
    //            }, {
    //                label: "Dynamic Popup",
    //                click: function() {
    //                    Popup = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //                    Popup.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_popup.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                Popup.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //                    var menu = Menu.buildFromTemplate(template);
    //                    Popup.setMenu(menu);
    //                }
    //            }, {
    //                label: "Notifications",
    //                click: function() {
    //                    notifWindow = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //
    //                    notifWindow.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_notification.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                notifWindow.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //
    //                    var menu = Menu.buildFromTemplate(template);
    //                    notifWindow.setMenu(menu);
    //                }
    //            }, {
    //                label: "Picker",
    //                click: function() {
    //                    Picker = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //                    Picker.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_picker.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                Picker.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //                    var menu = Menu.buildFromTemplate(template);
    //                    Picker.setMenu(menu);
    //
    //                }
    //            }, {
    //                label: "Progress bar",
    //                click: function() {
    //                    progress = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //                    progress.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_progressbar.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                progress.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //                    var menu = Menu.buildFromTemplate(template);
    //                    progress.setMenu(menu);
    //                }
    //            }, {
    //                label: "Swipeout",
    //                click: function() {
    //                    swipeoutWindow = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //
    //                    swipeoutWindow.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_swipeout.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                swipeoutWindow.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //
    //                    var menu = Menu.buildFromTemplate(template);
    //                    swipeoutWindow.setMenu(menu);
    //                }
    //            }, {
    //                label: "Swiper",
    //                click: function() {
    //                    swiper = new BrowserWindow({
    //                        width: 380,
    //                        height: 600,
    //                        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //                    })
    //                    swiper.loadURL(url.format({
    //                        pathname: path.join(__dirname, 'f7builder/index_swiper.html'),
    //                        protocol: 'file:',
    //                        slashes: true
    //                    }))
    //                    var template = [{
    //                        label: "View",
    //                        submenu: [{
    //                            label: "Reload",
    //                            click: function() {
    //                                progress.webContents.reload();
    //                            }
    //                        }]
    //                    }]
    //                    var menu = Menu.buildFromTemplate(template);
    //                    swiper.setMenu(menu);
    //                }
    //            }]
    //        }, {
    //            label: "Developer Tools",
    //            click: function() {
    //                mainWindow.webContents.openDevTools()
    //            }
    //        }]
    //    }]
    //
    //    var menu = Menu.buildFromTemplate(template);
    //    mainWindow.setMenu(menu);
    //}
    //
    //function mainBuilder() {
    //    var builderWindow = new BrowserWindow({
    //        width: 1204,
    //        height: 700,
    //        icon: path.join(__dirname, 'f7builder/img/favicon.png')
    //    })
    //
    //    builderWindow.loadURL(url.format({
    //        pathname: path.join(__dirname, 'f7builder/builder.html'),
    //        protocol: 'file:',
    //        slashes: true
    //    }))
    //
    //    var template = [{
    //        label: "View",
    //        submenu: [{
    //            label: "Reload",
    //            click: function() {
    //                builderWindow.webContents.reload();
    //            }
    //        }]
    //    }, {
    //        label: "Tools",
    //        submenu: [{
    //            label: "Developer Tools",
    //            click: function() {
    //                builderWindow.webContents.openDevTools()
    //            }
    //        }]
    //    }]
    //
    //    var menu = Menu.buildFromTemplate(template);
    //    builderWindow.setMenu(menu);
    //}
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