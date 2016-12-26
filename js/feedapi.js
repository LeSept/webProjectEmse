function displayNews(src) {
  var feed = new google.feeds.Feed(src);
  feed.load(function(result) {
    if (!result.error) {
      var content = document.getElementById('feed');
      var html = '';
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        html += '<p>' + entry.title + '</p>';
        }
        content.innerHTML += html;
      }
    });
  }



/*
*  How to find a feed based on a query.
*/

function searchKeyword(keyword) {
  // Query for president feeds on cnn.com
  var query = 'site:topito.com '+keyword;
  google.feeds.findFeeds(query, findDone);
}

function findDone(result) {
  // Make sure we didn't get an error.
  if (!result.error) {
    // Get content div
    var content = document.getElementById('feed');
    var html = '';

    // Loop through the results and print out the title of the feed and link to
    // the url.
    for (var i = 0; i < result.entries.length; i++) {
      var entry = result.entries[i];
      html += '<p>' + entry.title + '</p>';
    }
    return html;
  }
  return "error";
}