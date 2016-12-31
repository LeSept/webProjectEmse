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