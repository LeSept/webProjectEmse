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
        $(".dropdown-content").slideToggle("slow");
    });
});

//Slide down the navbar with the hamburger menu
$(document).ready(function(){
    $(".openHamburger").click(function(){
        $('#navbar-container').slideDown("slow");
        $(".openHamburger").hide();
        $(".closeHamburger").show();
    });
});
    
//Slide up the navbar with the hamburger menu
$(document).ready(function(){    
    $(".closeHamburger").click(function(){
        $('#navbar-container').slideUp("slow");
        $(".closeHamburger").hide();
        $(".openHamburger").show();
    });
});
