//grabbing key from .env file
require('dotenv').config();

var keys = require ('./keys.js'); //.export in the keys file is what allows me to require successfully
// console log this var to ensure our require is working
console.log(keys); //this logs the keys from the keys.js file

//Now do all requires for all the variables below so they load, so far we've only installed them
//see npm documentation. Changed var names but copied verbatim from documentation
var requestFoo = require('request');
var twitterFoo = require('twitter');
var spotifyFoo = require('node-spotify-api');

//last thing we need is the fs library, so we can log the file. This will log all the song and tweets into the random.txt file for extra credit.

var fs = require('fs'); //don't need to install; already built into node

var twitterFile = new twitterFoo(keys.twitter); //new is what we use to construct the twitter api
var spotifyFile = new spotifyFoo(keys.spotify);

var nodeProcessArgv = (process.argv); //array
var command = process.argv[2]; //can store in variable called command after index 1. Then in termainl can type node liri.js see-cat this will push "see-cat" to the array 

var nameSongMovie = ""; //NOTE: be surele to initialize variable with "" !!!

 
for (var i = 3; i < nodeProcessArgv.length; i++) {  
    nameSongMovie = nameSongMovie + " " + nodeProcessArgv[i];
    }

console.log(nameSongMovie);

//can use this if you don't use switch, but switch is more versatile
// if(command =="my-tweets") {
//     showMyTweets();
// } else if(command == "spotify-this-song") {
//     spotifySong(nameSongMovie);
// } else if (command =="movie-this") {
//     omdbData(nameSongMovie); 
// } else if ( command == "do-what-it-says") {
//     doThis();
// } else {
//     console.log('PLease enter a valid command: my-tweets, spotify-this-song, movie-this, do-what-it-says');
// }

//swtich commands allow you to run different action based on different conditions. Can run each case until a break.
switch(command){
    case "my-tweets":
        showMyTweets();
        break; 

    case "do-what-it-says":
        doThis();
        break;

    case "spotify-this-song":
        if (nameSongMovie) {
            spotifySong(nameSongMovie);
        } else {
            spotifySong("The Sign");
        }
        break;

    case "movie-this":
        if (nameSongMovie) {
            omdbMovie(nameSongMovie);
        } else {
            omdbMovie("Mr. Nobody");
        }
        break;

    default:
        console.log('Please enter in a valid command: my-tweets, spotify-this-song, movie-this, do-what-it-says');
}

function showMyTweets (){
    var screen = {screen_name: 'jrl_3435'};
        twitterFile.get('statuses/user_timeline', screen, function (error, tweets, response) {
        if(!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log('jrl_3435: ' + tweets[i].text + "created at: " + date.substring(0,19));
                console.log('____________________');

                fs.appendFileSync('log.txt', 'jrl_3435: ' + tweets[i].text + "created at: " + date.substring(0,19));
                fs.appendFileSync('log.txt', "____________________");
            }
        } else {
            console.log('error!');
        }
    })
}

function spotifySong (songName){
    spotifyFile.search({type: 'track', query: songName}, function (error, data){
        if(!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("artists: " + songData.artists[0].name);
                //song name
                console.log("song: " + songData.name);
                //spotify preview link
                console.log("preview url: " + songData.preview_url);
                //album name
                console.log('ablum: ' + songData.album.name);

                //adds text to log.txt
                fs.appendFileSync('log.tx', songData.artists[0].name + "\r\n");
                fs.appendFileSync('log.tx', songData.name + "\r\n");
                fs.appendFileSync('log.tx', songData.preview_url + "\r\n");
                fs.appendFileSync('log.tx', + songData.album.name + "\r\n");
            }
        } else {
            console.log("error!");
        }
    });
    
}

function omdbMovie (movieName){
    var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&tomatoes=true&apikey=e233a527"
    
     //response example: 404 error pg not found
    requestFoo (omdbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body); //////parse takes text and parses into a JS object

            console.log(body);
            console.log("title: " + body.Title);
            console.log("year: " + body.year);
            console.log("IMDB Rating: " + body.imbdRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actor: " + body.Actor);
            console.log("Rotten Tomato Rating: " + body.tomatoRating);
            console.log("Rotten Tomato URL: " + body.tomatoURL);
        } else if (movieName == "Mr. Nobody") {
            console.log('__________________');
            console.log('If you haven\'t watched "Mr. Nobody", then you should: http://www.imbd.com/title/tt0485947/');
            console.log('It\'s on Netflix');
        } else {
            console.log('error!');
        }
    });

}

function doThis() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        // console.log(data);
        var txt = data.split(",");
        var command = txt[0];
        var nameSongMovie = txt[1];


        switch(command){
            case "my-tweets":
                showMyTweets();
                break;
        
            case "spotify-this-song":
                if (nameSongMovie) {
                    spotifySong(nameSongMovie);
                } else {
                    spotifySong("The Sign");
                }
                break;
        
            case "movie-this":
                if (nameSongMovie) {
                    omdbMovie(nameSongMovie);
                } else {
                    omdbMovie("Mr. Nobody");
                }
                break;
        
            default:
                console.log('Please enter in a valid command: my-tweets, spotify-this-song, movie-this, do-what-it-says');
        }
    })
}


