/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  formSubmission();
  loadTweets();

  function loadTweets() {
    $.get({
      url: 'http://localhost:8080/tweets',
      success: function (firstTweets) {
        renderTweets(firstTweets);
      }
    });
  }

  function postTweet() {
    $.post({
      url: 'http://localhost:8080/tweets/',
      data: $('textarea').serialize(),
      method: 'POST',
      success: function () {
        alert($('textarea').serialize());
        // console.log($('textarea').serialize());
        // $('#tweet-stack').append(createTweetElement(newTweet));
        // createTweetElement(newTweet);
        // console.log(response);
      }
    });
  }

  function formSubmission() {
    $('.container')
    .find('.new-tweet')
    .find('form')
    .on('submit', function(event) {
      event.preventDefault();

      let charCount = +$('.counter').text();

      if (charCount === 140) {
        alert("You can't tweet nothing!  Compose a tweet from 1 to 140 characters.");
      } else if (charCount < 0) {
        alert(`You tweet must be less than 140 characters!  Your current tweet must be at least ${-charCount} characters less!`);
      } else {
        postTweet();
      }
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