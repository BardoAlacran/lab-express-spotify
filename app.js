require('dotenv').config();

const { query, application } = require('express');
const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
  

// Our routes go here:
app.get('/', (req, res) => {
    res.render('home');
  });


app.get('/artist-search', (req, res)=>{
    
    const { artist } = req.query;
    spotifyApi.searchArtists(artist)
    .then(data =>{
    console.log(data.body.artists)
    //res.send(data.body)
    const { items } = data.body.artists;

    res.render('artist-search-results', { items })
    })
    .catch(error => console.log(`the error is`, error))
    })

// app.get('/albums/:artistId', (req, res) => {
//   const { id } = req.params;
//   spotifyApi.getArtistAlbums(id)
//   .then(data => {
//     const { items } = data.body.artists;

//     res.render('albums', { items })
//   })
//   .catch(error => console.log(`the error is`, error))
// })


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
