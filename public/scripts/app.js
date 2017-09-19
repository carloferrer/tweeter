/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  formSubmission();
  loadTweets();

  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function (firstTweets) {
        // $('#tweet-stack').replaceWith(firstTweets);
        renderTweets(firstTweets);
        // console.log(firstTweets);
      }
    });
  }

  function formSubmission() {
    $('.container')
    .find('.new-tweet')
    .find('form')
    .on('submit', function(event) {
      event.preventDefault();
      alert($('.counter').text());
    });
  }

  function renderTweets(data) {
    for (let i = 0; i < data.length; i++) {
      $('#tweet-stack').append(createTweetElement(data[[i]]));
    }
  }

  function createTweetElement(tweetData) {
    let $newTweet = $('<article>').addClass('tweet-box');
    $newTweet
      .append('<header></header>')
      .append('<div></div>')
      .append('<footer></footer>');
    $newTweet.find('header')
      .append('<img src='+tweetData.user.avatars.small+'>')
      .append('<h2>'+tweetData.user.name+'</h2>')
      .append('<span class="handle">'+tweetData.user.handle+'</span>');
    $newTweet.find('div')
      .append('<span class="content">'+tweetData.content.text+'</span>');
    $newTweet.find('footer')
      .append('<span class="timestamp">'+tweetData.created_at+'</span>');

    return $newTweet;
  }
});