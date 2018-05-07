const electron = require('electron')
const Menu = electron.Menu
const path = require('path')
const url = require('url')
const fs = require('fs')
const BrowserWindow = electron.remote.BrowserWindow
const PDFWindow = require('electron-pdf-window')

fs.readdir(path.join(__dirname, 'pages/'), (err, dir) => {
    $$(document).find('#list-file-html').empty();
    $$(document).find('#list-file-html').append(
        '<li style="color:rgba(0, 0, 0, 0.54);background-color:#f4f4f4;">' +
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
                '           <div class="item-after"><i class="icon material-icons" id="btn-design-html" data-file="' + fileName + '">view_carousel</i>&nbsp;&nbsp;&nbsp;<i class="material-icons" style="font-size:22px;" id="btn-open" data-file="' + fileName + '">edit</i></div>' +
                '       </div>' +
                '   </div>' +
                '</li>');
        }
    }
});

fs.readdir(path.join(__dirname, 'js/'), (err, dir) => {
    $$(document).find('#list-file-js').empty();
    $$(document).find('#list-file-js').append(
        '<li style="color:rgba(0, 0, 0, 0.54);background-color:#f4f4f4;">' +
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

var searchbar = app.searchbar.create({
    el: '.searchbar'
});

$$(document).on('click', '#btn-design-html', function() {
    var fileName = $$(this).attr('data-file');
    let loadpage
    loadpage = new BrowserWindow({
        width: 1204,
        height: 700,
        icon: path.join(__dirname, 'img/favicon.png')
    })
    PDFWindow.addSupport(loadpage)  
    loadpage.loadURL(url.format({
        //pathname: path.join(__dirname, 'builder.html'),
        pathname: path.join(__dirname, 'pdfcontent/a.pdf'),
        protocol: 'file:',
        slashes: true
    }))
});

$$(document).on('page:init', '.page[data-name="editor_code"]', function(e) {
    var searchbar = app.searchbar.create({
        el: '.searchbar'
    });
    
    var editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        selectionPointer: true,
        theme: "monokai",
        tabSize: 5,
        firstLineNUmber: 50,
        styleActiveLine: true,
        lineWrapping: true,
        extraKeys: {"Ctrl-Space": "autocomplete", "Alt-F": "findPersistent"}
    });
    
    function change(fileName) {
        var val = fileName, m, mode, spec;
        if (m = /.+\.([^.]+)$/.exec(val)) {
          var info = CodeMirror.findModeByExtension(m[1]);
          if (info) {
            mode = info.mode;
            //spec = ; info.mime;
            if(info.mime === 'text/html'){
                spec = 'css';
            }else{
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
          console.log(mode+"--"+spec);
        } else {
          alert("Could not find a mode corresponding to " + val);
        }
    }

    $$(document).on('click', '#btn-open', function() {
        var fileName = $$(this).attr('data-file');
        $$(document).find('#btn-save-file').attr('data-file', fileName);
        words = fileName.split('.');
        
        if(words[1] === 'html'){
            fs.readFile(path.join(__dirname, 'pages/' + fileName), 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                change(fileName, data);
                editor.getDoc().setValue(data);
            });
        }else if(words[1] === 'js'){
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
            var html = editor.getDoc().getValue();

            fs.writeFileSync(path.join(__dirname, 'pages/' + fileName), html, 'utf-8');

            app.dialog.alert('File saved', 'Information');
        }
    });
});     