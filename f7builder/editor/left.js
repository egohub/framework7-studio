const path = require('path');
const url = require('url');
const fs = require('fs');

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
                '           <div class="item-after"><i class="icon material-icons" id="btn-design-html" data-file="' + fileName + '">view_carousel</i>&nbsp;&nbsp;&nbsp;<i class="material-icons" style="font-size:22px;" id="btn-open-html" data-file="' + fileName + '">edit</i></div>' +
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
                '           <div class="item-after"><i class="material-icons">edit</i></div>' +
                '        </div>' +
                '    </div>' +
                '</li>');
        }
    }
});

var searchbar = app.searchbar.create({
    el: '.searchbar'
});

$$(document).on('click', '#btn-open-html', function() {
    var fileName = $$(this).attr('data-file');

    console.log(fileName);

    fs.readFile(path.join(__dirname, 'pages/' + fileName), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    })
});