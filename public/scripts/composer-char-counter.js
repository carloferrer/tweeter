$(document).ready(function() {
  $('.new-tweet').on('keypress', function() {
    var count = +($(this).find('.counter').text());
    alert(count);
  });
});