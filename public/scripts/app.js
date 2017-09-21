/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  formSubmission();
  loadTweets();
  composeToggle();

  function composeToggle() {
    $('#nav-bar')
    .find('input')
    .on('click', function() {
      if($('.new-tweet').is(':visible')) {
        $('textarea').blur();
        $('.new-tweet').slideToggle();
      } else {
        $('.new-tweet').slideToggle();
        $('textarea').focus();
      }
    });
  }

  function loadTweets() {
    $.get('http://localhost:8080/tweets')
    .done(function(result) {
      $('#tweet-stack').empty();

      for (let tweet of result.reverse()) {
        $('#tweet-stack')
          .append(createTweetElement(tweet));
      }
    })
    .fail(function(error) {
      console.error(error);
    });
  }

  function postTweet(newTweet) {
    $.post('http://localhost:8080/tweets/', newTweet)
    .done(function(result) {
      loadTweets();
    })
    .fail(function(error) {
      console.error(error);
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
        let newTweet = $('textarea').serialize();
        $('textarea').val('');
        postTweet(newTweet);
      }
    });
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
      .append('<span class="timestamp">Tweeted about '+timeSince(tweetData.created_at)+' ago.</span>')
      .append('<div class="icons"><span class="flag">⚑</span>&nbsp&nbsp&nbsp<span class="retweet">🔁</span>&nbsp&nbsp&nbsp<span class="like">❤</span></div>');

    return $newTweet;
  }
});


function timeSince(date) {
//https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " year(s)";
  }
  interval = Math.floor(seconds / 2628000);
  if (interval >= 1) {
    return interval + " month(s)";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day(s)";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour(s)";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minute(s)";
  }
  return Math.floor(seconds) + " second(s)";
}