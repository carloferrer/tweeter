$(document).ready(function() {
  $('.new-tweet').on('keypress', function() {
    let count = +($(this).find('.counter').text());
    let diff = $(this).find('textarea').val().length;

  });
});