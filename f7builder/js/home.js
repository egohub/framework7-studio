$$(document).on('page:init', '.page[data-name="home"]', function(e) {
  var searchbar = app.searchbar.create({
    el: '.searchbar',
  });
});