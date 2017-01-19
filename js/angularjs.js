var myApp = angular.module('myApp', ['ngAnimate', 'checklist-model']);

myApp
// On ne peut avoir qu'UN seul _ng-app_ par fichier html. Il faut donc ajouter les _controller_ de cette façon :

.controller("preferenceController", ['$scope', function($scope) {
    // Toutes les préférences possibles
    $scope.preferences = [
        "coming soon..."
    ];
    // Les préférences de l'utilisateur ; on y met la une par défaut
    $scope.user = {
    preferences: ["une"]
    };
    // On remplit les préférences de l'utilisateur avec ce qu'on a dans les cookies
    for (var i=0; i<user["userCookies"].length; i++) {
        $scope.user.preferences.push(user["userCookies"][i]);
    }
    
    $scope.checkAll = function() {
        $scope.user.preferences = angular.copy($scope.preferences);
    };
    
    $scope.uncheckAll = function() {
        $scope.user.preferences = [];
    };
    
    $scope.checkFirst = function() {
        $scope.user.preferences.splice(0, $scope.user.preferences.length);
        $scope.user.preferences.push("une");
    };   
}])


.controller("pageController", ['$scope', function($scope) {
    $scope.category = "À LA UNE";
    $scope.allCategories = ["SEARCH A TOPIC", "À LA UNE"];
    $scope.actualize = function(cat){
        $scope.category = cat;
    }
    var _searcharticles = "";
    $scope.searcharticles = function(keyword){
        
        if(arguments.length){
            searchKeyword(keyword);
            return (_searcharticles = keyword);
        }else{
            return _searcharticles;
        }
    }
    
    function searchKeyword(keyword) {
      // Query for president feeds on cnn.com
        document.getElementById('results-container').innerHTML = '';
        for(var site in sources.sites){
            var query = 'site:'+sources.sites[site]+ ' '+keyword;
            //google.feeds.findFeeds(query, findDone);
            window.setTimeout(function() {
                google.feeds.findFeeds(query, findDone)
            }, 2000);
        }

    }

    function findDone(result) {
      // Make sure we didn't get an error.
      if (!result.error) {
        // Get content div

        var container = document.getElementById('results-container');
          var html = '';

        // Loop through the results and print out the title of the feed and link to
        // the url.
        for (var i = 0; i < result.entries.length; i++) {
          var entry = result.entries[i];
          html += '<div class = "articles-item articles-medium"><h2 class = "articles-title">' + entry.title + '</h2><p class = "summaryContent">'+ entry.contentSnippet+'</p><a href="'+entry.link+'" class = "articles-link">Lire l\'article sur le web</a> </div>';

        }
        container.innerHTML += html;
      }
    }
    
    
}])


.controller("articlesSpace", ['$scope', function($scope){
    $scope.articles = new Array();
        
    displayNews = function(scope) {
    //on parcourt les catégories des sources à disposition
        scope.articles = new Array();
        var date = ""; // date de publication des articles
        var type = ""; // type de l'article our l'affichage, s'il doit être affiché petit, grand ou moyen.
        var now = new Date();
        var intervalle = 0; // nbr de secondes entre maintenant et la date de l'aricle
        var month = ""; // pour ecrire 01 au lieu de 1
        
        for(var src in sources){
            if(src != "sites" && src != "getCategories"){
                for(var url in sources[src]){
                    // API changé

                    feednami.loadGoogleFormat(sources[src][url],
                    function(result, src) {
                        
                        if (!result.error) {
                            alert(sources[src][url]);
                            for (var i = 0; i < result.feed.entries.length; i++) {
                                alert(1);
                                date = result.feed.entries[i].publishedDate;
                                
                                //on détermine le type de l'article en fonction de la date
                                intervalle = (now.getFullYear()-date.substring(7,11))*86400*365+(now.getMonth()+1-getMonthFromString(date.substring(3,6)))*86400*30+(now.getDate()-date.substring(0,2))*86400+(now.getHours()-date.substring(12,14))*3600+(now.getMinutes()-date.substring(15,17))*60+(now.getSeconds()-date.substring(18,20));
                                
                                
                                if(intervalle<12*3600){
                                    type = "articles-large";
                                }else if(intervalle<86400){
                                    type = "articles-medium";
                                }else{
                                    type = "articles-small";
                                }
                                
                                month = getMonthFromString(date.substring(3,6))<10 ? "0"+getMonthFromString(date.substring(3,6)):""+getMonthFromString(date.substring(3,6));
                                
                                //construction de le date de l'article. On ne peut pas a prendre telle qu'elle est car cela pose problème pour le tri
                                date = date.substring(7,11)+"-"+month+"-"+date.substring(0,2)+" "+date.substring(12,20);
                                
                                //met en majuscule + enregistrement dans scope.allCategories + ajout ou non de l'article
                                for(var element in result.feed.entries[i].categories){
                                    result.feed.entries[i].categories[element] = result.feed.entries[i].categories[element].toUpperCase();
                                    scope.allCategories.includes(result.feed.entries[i].categories[element]) ? true : scope.allCategories.push(result.feed.entries[i].categories[element]);
                                }
                                
                                
                                scope.articles.push({"title":result.feed.entries[i].title, "contentSnippet":result.feed.entries[i].contentSnippet, "link":result.feed.entries[i].link, "date":date, "type":type, "categories":result.feed.entries[i].categories});
                            }
                        }
                        $scope.$apply();
                    });
                
            }
        } 
    }
    }
    
    function getMonthFromString(mon){
       return new Date(Date.parse(mon +" 1, 2016")).getMonth()+1;
    }

    displayNews($scope);
    // on actualise les articles régulièrement
    
}]);
