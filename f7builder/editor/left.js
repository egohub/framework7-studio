const electron = require('electron')
const Menu = electron.Menu
const path = require('path')
const url = require('url')
const fs = require('fs')
const BrowserWindow = electron.remote.BrowserWindow
const beautify_js = require('js-beautify').js_beautify
const pretty = require('pretty');

function file_list_html() {
    fs.readdir(path.join(__dirname, 'pages/'), (err, dir) => {
        $$(document).find('#list-file-html').empty();
        $$(document).find('#list-file-html').append(
            '<li style="color:rgba(0, 0, 0, 0.54);background-color:#f4f4f4;" id="btn-create-html">' +
            '   <div class="item-content">' +
            '       <div class="item-inner">' +
            '           <div class="item-title">HTML</div>' +
            '           <div class="item-after"><i class="material-icons">add</i></div>' +
            '       </div>' +
            '   </div>' +
            '</li>');
        if (dir.length === 0) {
            //Do Nothing
        } else {
            for (var i = 0; i < dir.length; i++) {
                let fileName = dir[i];
                $$(document).find('#list-file-html').append(
                    '<li>' +
                    '   <div class="item-content">' +
                    '       <div class="item-inner">' +
                    '           <div class="item-title">' + fileName + '</div>' +
                    '           <div class="item-after"><i class="icon material-icons" id="btn-design-html" data-file="' + fileName + '">web</i>&nbsp;&nbsp;&nbsp;<i class="material-icons" style="font-size:22px;" id="btn-open" data-file="' + fileName + '">edit</i></div>' +
                    '       </div>' +
                    '   </div>' +
                    '</li>');
            }
        }
    });
}

function file_list_js() {
    fs.readdir(path.join(__dirname, 'js/'), (err, dir) => {
        $$(document).find('#list-file-js').empty();
        $$(document).find('#list-file-js').append(
            '<li style="color:rgba(0, 0, 0, 0.54);background-color:#f4f4f4;" id="btn-create-js">' +
            '   <div class="item-content">' +
            '       <div class="item-inner">' +
            '           <div class="item-title">Javascript</div>' +
            '           <div class="item-after"><i class="material-icons">add</i></div>' +
            '       </div>' +
            '   </div>' +
            '</li>');
        if (dir.length === 0) {
            //Do Nothing
        } else {
            for (var i = 0; i < dir.length; i++) {
                let fileName = dir[i];
                $$(document).find('#list-file-js').append(
                    '<li>' +
                    '    <div class="item-content">' +
                    '        <div class="item-inner">' +
                    '            <div class="item-title">' + fileName + '</div>' +
                    '           <div class="item-after"><i class="material-icons" style="font-size:22px;" id="btn-open" data-file="' + fileName + '">edit</i></div>' +
                    '        </div>' +
                    '    </div>' +
                    '</li>');
            }
        }
    });
}

file_list_html();

file_list_js();

var searchbar = app.searchbar.create({
    el: '.searchbar',
    searchContainer: '.list',
    searchIn: '.item-title'
});

$$(document).on('click', '#btn-design-html', function() {
    var fileName = $$(this).attr('data-file');
    let loadpage
    loadpage = new BrowserWindow({
        width: 1204,
        height: 700,
        icon: path.join(__dirname, 'img/favicon.png')
    })

    loadpage.loadURL(url.format({
        pathname: path.join(__dirname, 'builder.html'),
        protocol: 'file:',
        slashes: true
    }))

    fs.writeFileSync(path.join(__dirname, 'temp.html'), fileName, 'utf-8');
});

$$(document).on('page:init', '.page[data-name="editor_code"]', function(e) {
    var searchbar = app.searchbar.create({
        el: '.searchbar'
    });

    fs.readFile(path.join(__dirname, 'pages/home.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        change('home.html', data);
        editor.getDoc().setValue(data);
    });

    var editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        selectionPointer: true,
        theme: "monokai",
        tabSize: 5,
        firstLineNUmber: 50,
        styleActiveLine: true,
        lineWrapping: true,
        extraKeys: { "Ctrl-Space": "autocomplete", "Alt-F": "findPersistent" }
    });

    function change(fileName) {
        var val = fileName,
            m, mode, spec;
        if (m = /.+\.([^.]+)$/.exec(val)) {
            var info = CodeMirror.findModeByExtension(m[1]);
            if (info) {
                mode = info.mode;
                //spec = ; info.mime;
                if (info.mime === 'text/html') {
                    spec = 'css';
                } else {
                    spec = info.mime;
                }
            }
        } else if (/\//.test(val)) {
            var info = CodeMirror.findModeByMIME(val);
            if (info) {
                mode = info.mode;
                spec = val;
            }
        } else {
            mode = spec = val;
        }
        if (mode) {
            editor.setOption("mode", spec);
            CodeMirror.autoLoadMode(editor, mode);
            //console.log(mode + "--" + spec);
        } else {
            alert("Could not find a mode corresponding to " + val);
        }
    }

    $$(document).on('click', '#btn-format-file', function() {
        var fileName = $$(this).attr('data-file');

        var fileType = fileName.split('.');

        if (fileType[1] === 'html') {
            fs.readFile(path.join(__dirname, 'pages/' + fileName), 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }
                editor.getDoc().setValue(pretty(data, { ocd: true }));
            });
        } else if (fileType[1] === 'js') {
            fs.readFile(path.join(__dirname, 'js/' + fileName), 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }
                editor.getDoc().setValue(beautify_js(data, { indent_size: 2 }));
            });
        }
    });

    $$(document).on('click', '#btn-open', function() {
        var fileName = $$(this).attr('data-file');

        $$(document).find('#editor_code_title').html(fileName);

        $$(document).find('#btn-save-file').attr('data-file', fileName);

        $$(document).find('#btn-delete-file').attr('data-file', fileName);

        $$(document).find('#btn-format-file').attr('data-file', fileName);

        words = fileName.split('.');

        if (words[1] === 'html') {
            fs.readFile(path.join(__dirname, 'pages/' + fileName), 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                change(fileName, data);
                editor.getDoc().setValue(data);
            });
        } else if (words[1] === 'js') {
            fs.readFile(path.join(__dirname, 'js/' + fileName), 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                change(fileName, data);
                editor.getDoc().setValue(data);
            });
        }
    });

    $$(document).on('click', '#btn-save-file', function() {
        var fileName = $$(this).attr('data-file');

        if (fileName === null) {
            app.dialog.alert('Please open file to save', 'Information');
        } else {
            var fileType = fileName.split('.');

            var html = editor.getDoc().getValue();

            if (fileType[1] === 'html') {
                fs.writeFileSync(path.join(__dirname, 'pages/' + fileName), html, 'utf-8');
            } else if (fileType[1] === 'js') {
                fs.writeFileSync(path.join(__dirname, 'js/' + fileName), html, 'utf-8');
            }
            app.dialog.alert('File saved', 'Information');
        }
    });

    $$(document).on('click', '#btn-delete-file', function() {
        var fileName = $$(this).attr('data-file');

        var fileType = fileName.split('.');

        if (fileName === null) {
            app.dialog.alert('Please open file to remove', 'Information');
        } else {
            if (fileName === 'index.html' || fileName === 'home.html' || fileName === '404.html' || fileName === 'app.js' || fileName === 'helper.js' || fileName === 'home.js' || fileName === 'routes.js') {
                app.dialog.alert('Canot remove this file', 'Information');
            } else {
                app.dialog.confirm('Remove this file?', 'Warning', function() {
                    if (fileType[1] === 'html') {
                        fs.unlink(path.join(__dirname, 'pages/' + fileName), (err) => {
                            if (err) {
                                app.dialog.alert('Canot remove this file', 'Error');
                                console.log(err);
                                return;
                            }

                            file_list_html();
                            file_list_js();
                        });
                    } else if (fileType[1] === 'js') {
                        fs.unlink(path.join(__dirname, 'js/' + fileName), (err) => {
                            if (err) {
                                app.dialog.alert('Canot remove this file', 'Error');
                                console.log(err);
                                return;
                            }

                            file_list_html();
                            file_list_js();
                        });
                    }
                });
            }
        }
    });
});

$$(document).on('click', '#btn-create-html', function() {
    app.dialog.prompt('Filename', 'New HTML File', function(fileName) {
        fileType = fileName.split('.');
        if (fileType[1] !== 'html') {
            app.dialog.alert('Allow .html only', 'Information');
        } else if (fileType === null) {
            fs.writeFileSync(path.join(__dirname, 'pages/' + fileName + '.html'), '', 'utf-8');
        } else {
            fs.writeFileSync(path.join(__dirname, 'pages/' + fileName), '', 'utf-8');
        }
        file_list_html();
        file_list_js();
    });
});

$$(document).on('click', '#btn-create-js', function() {
    app.dialog.prompt('Filename', 'New Javascript File', function(fileName) {
        fileType = fileName.split('.');
        if (fileType[1] !== 'js') {
            app.dialog.alert('Allow .js only', 'Information');
        } else if (fileType === null) {
            fs.writeFileSync(path.join(__dirname, 'js/' + fileName + '.js'), '', 'utf-8');
        } else {
            fs.writeFileSync(path.join(__dirname, 'js/' + fileName), '', 'utf-8');
        }
        file_list_html();
        file_list_js();
    });
});