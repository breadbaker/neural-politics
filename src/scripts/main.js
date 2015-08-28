'use strict';
// main entry point for the application

$.ajaxSetup({
    statusCode: {
        403: function(error, callback){
            window.location.pathname = '/web/call-limit.html';
        }
    }
});
var MainApp = require('./apps/main-app');
window.App = new MainApp();

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1710786102482935',
        xfbml      : true,
        version    : 'v2.4'
    });
};

(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.facebook_share = function(name, image) {
    var settings = {
        link: shareUrlBase(),
        method: 'feed',
        name: window.facebook_title,
        picture: window.facebook_image,
        description: window.facebook_message,
        display: 'popup'
    };
    FB.ui( settings, function (response) {}  );  
}

App.initialize();


window.shareUrlBase = function () {
    return 'http://politics-in-public.com/' + window.location.hash;  
}

window.twitter_tweet = function () {
  $.ajax({
    url: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCZ84coaoKgg8qtdKVqecz6CXV2g56lErU",
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify({
        longUrl: shareUrlBase()
    }),
    success: function(data) {
        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(window.twitter_message + ' #open-politics') + ' ' + data.id, 'Tweet', 'location=100,status=0,width=600,height=350');
    },
    error: function(a) {
        console.log(a);
    }
  })
  return false;
}
