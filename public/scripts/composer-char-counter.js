$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    let diff = $(this).val().length;
    $(this).parent().find('.counter').text(140 - diff);
    if (diff > 140) {
      $(this).parent().find('.counter').css({'color' : 'red'});
    } else {
      $(this).parent().find('.counter').css({'color' : '#244751'});
    }
  });
});