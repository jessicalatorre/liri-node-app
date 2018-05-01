console.log('this is loaded');

//use exports to export to sep files
exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
  // should see the console.log below when your run node liri.js in bash. This also works for functions
  // whatever: "hello world"
};


// OMDB KEY:  http://www.omdbapi.com/?i=tt3896198&apikey=e233a527  e233a527


