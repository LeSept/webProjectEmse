// Make the navbar-container stick on the top when it touches the top
$(document).ready(function() {
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 210) {
      $('#navbar-container').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 211) {
      $('#navbar-container').removeClass('navbar-fixed');
    }
  });
});

//Slide down the dropdown-content
$(document).ready(function(){
    $("#navbar-category").hover(function(){
        $(".dropdown-content").slideToggle("fast");
    });
});