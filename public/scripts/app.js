/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  var tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  function createTweetElement(tweetData) {
    let $newTweet = $('<article>').addClass('tweet-box');
    $newTweet
      .append('<header></header>')
      .append('<footer></footer>');
    $newTweet.find('header')
      .append('<img src='+tweetData.user.avatars.small+'>')
      .append('<h2>'+tweetData.user.name+'</h2>')
      .append('<span class="handle">'+tweetData.user.handle+'</span>');
    return $newTweet;
  }
  $('#tweet-stack').append(createTweetElement(tweetData));
});

// Test / driver code (temporary)
// console.log(tweet); // to see what it looks like
// $('#tweet-stack').append(tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.