// Make the navbar-container stick on the top when it touches the top
$(document).ready(function() {
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 680) {
      $('#navbar-container').addClass('navbar-fixed');
      $('#navbar-meteo').hide();
    }
    if ($(window).scrollTop() < 681) {
      $('#navbar-container').removeClass('navbar-fixed');
      $('#navbar-meteo').show();
    }
  });
});

//Slide down the dropdown-content
$(document).ready(function(){
    $("#navbar-category").click(function(){
        $(".dropdown-content").slideToggle("slow");
    });
});

//Slide down the navbar with the hamburger menu
$(document).ready(function(){
    $(".openHamburger").click(function(){
        $('#navbar-container').slideDown("slow");
        $(".openHamburger").hide();
        $(".closeHamburger").show();
        if ($(window).scrollTop() < 681) {
            $(".welcome").hide();
        }
    });
});
    
//Slide up the navbar with the hamburger menu
$(document).ready(function(){
    $(".closeHamburger").click(function(){
        $('#navbar-container').slideUp("slow");
        $(".closeHamburger").hide();
        $(".openHamburger").show();
        if ($(window).scrollTop() < 681) {
            $(".welcome").show();
        }
    });
});

//Display the horoscope
$(document).ready(function(){
    $("#navbar-meteo").click(function(){
        $('#horoscope-container').slideToggle("slow");
    });
});


