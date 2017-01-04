<<<<<<< HEAD

var myApp = angular.module('myApp', ['ngAnimate', 'checklist-model']);

myApp
// On ne peut avoir qu'UN seul _ng-app_ par fichier html. Il faut donc ajouter les _controller_ de cette façon :

.controller("preferenceController", ['$scope', function($scope) {
    // Toutes les préférences possibles
    $scope.preferences = [
        "une", 
        "attentat", 
        "europe", 
        "monde", 
        "afrique"
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
    $scope.allCategories = ["À LA UNE"];
    $scope.actualize = function(cat){
        $scope.category = cat;
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
        
        
        for(var src in sources){
            if(src != "sites"){
                for(var url in sources[src]){
                    var feed = new google.feeds.Feed(sources[src][url]);
                    feed.load(function(result) {
                        if (!result.error) {
                            for (var i = 0; i < result.feed.entries.length; i++) {
                                
                                
                                date = result.feed.entries[i].publishedDate;
                                
                                //on détermine le type de l'article en fonction de la date
                                intervalle = (now.getFullYear()-date.substring(12,16))*86400*365+(now.getMonth()+1-getMonthFromString(date.substring(8,11)))*86400*30+(now.getDate()-date.substring(5,7))*86400+(now.getHours()-date.substring(17,19))*3600+(now.getMinutes()-date.substring(20,22))*60+(now.getSeconds()-date.substring(23,25));
                                
                                
                                if(intervalle<12*3600){
                                    type = "articles-large";
                                }else if(intervalle<86400){
                                    type = "articles-medium";
                                }else{
                                    type = "articles-small";
                                }
                                
                                //construction de le date de l'article. On ne peut pas a prendre telle qu'elle est car cela pose problème pour le tri
                                date = date.substring(12,16)+"-"+getMonthFromString(date.substring(8,11))+"-"+date.substring(5,7)+" "+date.substring(17,25);
                                
                                //met en majuscule + enregistrement dans scope.allCategories + ajout ou non de l'article
                                for(var element in result.feed.entries[i].categories){
                                    result.feed.entries[i].categories[element] = result.feed.entries[i].categories[element].toUpperCase();
                                    scope.allCategories.includes(result.feed.entries[i].categories[element]) ? true : scope.allCategories.push(result.feed.entries[i].categories[element]);
                                    
                                }
                                
                                scope.articles.push({"title":result.feed.entries[i].title, "contentSnippet":result.feed.entries[i].contentSnippet, "link":result.feed.entries[i].link, "date":date, "type":type, "categories":result.feed.entries[i].categories});
                            }
                        }
                        scope.allCategories.sort();
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
    //window.setInterval(function(){displayNews($scope)}, 10000);
    
}]);
