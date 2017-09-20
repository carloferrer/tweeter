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
      .append('<span class="timestamp">'+convertTime(tweetData.created_at)+'</span>');

    return $newTweet;
  }
});

function convertTime(longNum) {
  // https://stackoverflow.com/questions/4611754/javascript-convert-seconds-to-a-date-object
  let shortNum = new Date(1970, 0, 1);
  shortNum.setSeconds(1 + (longNum / 1000));
  return  shortNum;
}