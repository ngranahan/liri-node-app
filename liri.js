require("dotenv").config();

var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var twitter = require("twitter");


var newSpotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var inputOne = process.argv[2];
var inputTwo = process.argv[3];

switch (inputOne) {
    case "my-tweets":
    getTweets();
    break;
    case "spotify-this-song":
    getSong();
    break;
    case "movie-this":
    getMovie();
    break;
    case "do-what-it-says":
    doTheThing();
    break;
    default:
    console.log("Input not recognized, please try again.")
}


function getTweets() {

    var params = {screen_name: 'DrRaulGonzoDuke', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {

  if (!error) {

    console.log("\n" + tweets[0].user.screen_name);

    for (var i = 0; i < tweets.length; i++) {
        console.log("---------------");

        console.log(tweets[i].text);
        console.log(tweets[i].created_at);

        console.log("---------------");
    }
  }
});

};


