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

    var params = { screen_name: 'DrRaulGonzoDuke', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

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

function getSong() {

    if (process.argv.length === 4) {

        newSpotify
            .search({ type: 'track', query: process.argv[3], limit: 5 })
            .then(function (response) {

                console.log("\nArtist: " + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));

                console.log("---------------");

                console.log("Song: " + process.argv[3]);

                console.log("---------------");

                console.log("URL: " + JSON.stringify(response.tracks.items[0].album.external_urls.spotify, null, 2));

                console.log("---------------");

                console.log("Album: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));

                console.log("---------------");
            })

            .catch(function (err) {
                console.log(err);
            });

    } else {

        newSpotify
            .search({ type: 'track', query: 'The Sign', limit: 10 })
            .then(function (response) {

                for (var x = 0; x < response.tracks.items.length; x++) {

                    if (response.tracks.items[x].artists[0].name === "Ace of Base") {

                        console.log("\nArtist: " + JSON.stringify(response.tracks.items[x].artists[0].name, null, 2));

                        console.log("---------------");

                        console.log("Song: The Sign");

                        console.log("---------------");

                        console.log("URL: " + JSON.stringify(response.tracks.items[x].album.external_urls.spotify, null, 2));

                        console.log("---------------");

                        console.log("Album: " + JSON.stringify(response.tracks.items[x].album.name, null, 2));

                        console.log("---------------");

                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });

    }

}
