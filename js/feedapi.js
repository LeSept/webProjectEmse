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
  var query = 'site:lemonde.fr '+keyword;
  google.feeds.findFeeds(query, findDone);
}

function findDone(result) {
  // Make sure we didn't get an error.
  if (!result.error) {
    // Get content div
    
    var container = document.getElementById('articles-container');
      var html = '';

    // Loop through the results and print out the title of the feed and link to
    // the url.
    for (var i = 0; i < result.entries.length; i++) {
      var entry = result.entries[i];
      if(i<2){
          html += '<div class = "articles-item articles-large"><h2 class = "summaryTitle">' + entry.title + '</h2><p class = "summaryContent">'+ entry.contentSnippet+'</p><a href="'+entry.link+'">Lire l\'article sur le web</a> </div>';
      }else if(i<8){
          html += '<div class = "articles-item articles-medium"><h2 class = "summaryTitle">' + entry.title + '</h2><p class = "summaryContent">'+ entry.contentSnippet+'</p><a href="'+entry.link+'">Lire l\'article sur le web</a> </div>';
      }else{
          html += '<div class = "articles-item articles-small"><h2 class = "summaryTitle">' + entry.title + '</h2><p class = "summaryContent">'+ entry.contentSnippet+'</p><a href="'+entry.link+'">Lire l\'article sur le web</a> </div>';
      }
      
    }
    container.innerHTML = html;
  }
}