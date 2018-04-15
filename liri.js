require("dotenv").config();

var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var omdb = require('omdb');
var request = require("request");
var fs = require("fs");

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

function getMovie() {

    console.log("running movie function");

    if (process.argv === 4) {

        request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released: " + JSON.parse(body).Teleased);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country of Origin: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);

                console.log("Actors: " + JSON.parse(body).Actors);

            }
        });

    } else {

        request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released: " + JSON.parse(body).Teleased);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country of Origin: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);

            }
        });

    }

}

function doTheThing() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }

        console.log(data);

        var splitData = data.split(",");
        console.log("data test: " + splitData[0]);
        console.log("data test 2: " + splitData[1]);

        if (splitData[0] === "spotify-this-song") {

            newSpotify
            .search({ type: 'track', query: splitData[1], limit: 5 })
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
        }

    })
}
