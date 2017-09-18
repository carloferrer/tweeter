$(document).ready(function() {
  $('.new-tweet').on('keyup', function() {
    // let count = +($('.counter').text());
    let diff = $('textarea').val().length;

    $('.counter').text(140 - diff);
  });
});