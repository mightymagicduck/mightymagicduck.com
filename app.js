function addToContent(producer, title, board)
{
  var url = 'http://mygully.com/thread/' + board + '/';

  $('#content').find('tbody').append('<tr><td>' + producer + '</td><td>' + title + '</td><td><a target="_blank" href="' + url + '">' + url + '</td></tr>');
}

function buildContent(db)
{
  $('#content').find('tbody').empty();

  _.each(db, function(entry) {
    addToContent(entry.producer, entry.title, entry.board);
  });
}

buildContent(db);

var fuse = new Fuse(db, {
  shouldSort: false,
  tokenize: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "producer",
    "title"
  ]
});

$('#search').on('input', function() {
  var search_text = $('#search').val();

  if (search_text.length === 0) {
    buildContent(db);
  } else {
    buildContent(fuse.search(search_text));
  }
});
