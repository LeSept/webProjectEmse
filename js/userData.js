var user = {
    "search": function() {
        var keyword = document.getElementById('searchBar').textContent;
        searchKeyword(keyword);
    },
    
    "initialize": function() {
        displayNews(sources.france24.europe);
        displayNews(sources.france24.france);
        displayNews(sources.france24.monde);
        displayNews(sources.topito);
        displayNews(sources.lemonde.une);
    },
    // Les cookies de l'utilisateur sont stockés ici
    "userCookies": []
};