$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    let diff = $(this).val().length;
    $(this).parent().find('.counter').text(140 - diff);
  });
});