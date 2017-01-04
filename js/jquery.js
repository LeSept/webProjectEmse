// Make the navbar-container stick on the top when it touches the top
$(document).ready(function() {
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 210) {
      $('#navbar-container').addClass('navbar-fixed');
        /*
      $('#navbar-login').hide();
      $('#navbar-meteo').hide();
      */
    }
    if ($(window).scrollTop() < 211) {
      $('#navbar-container').removeClass('navbar-fixed');
        /*
      $('#navbar-login').show();
      $('#navbar-meteo').show();
      */
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

//Display the horoscope
$(document).ready(function(){
    $("#navbar-meteo").click(function(){
        $('#horoscope-container').slideToggle("slow");
        setTimeout(closeHoroscope, 1*60*1000)
    });
});

function closeHoroscope() {
    $('#horoscope-container').hide("slow");
}

//Display the preferences
$(document).ready(function(){
    $("#navbar-login").click(function(){
        $('#preferences-container').slideToggle("slow");
    });
});


