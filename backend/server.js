"use strict";

const e = require("express");
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require("./data/top50");


express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  //all data listed from top50
  .get("/top50", (req, res) => {
    res.status(200).json({ status: 200, data: top50 });
  })

  //list the specific song ranking from data in top50 (in this case rank is the id)
  .get("/top50/song/:rank", (req, res) => {
     const songRank = req.params.rank;
     const rankNum = Number(songRank);

     const songInfo = top50.find((song) => {
       return song.rank === rankNum
     })
    //if not in topSongsData, throw the error 404 and display song is not found
    if (!songInfo) {res.status(404).json({ status: 404, message: "Sorry, song not found." })
    //otherwise, display 200 status with the stopSongsData result
      } else {
        res.status(200).json({ status: 200, data: songInfo })
      }
    //console.log(req.params)
  })

  //getting songs by a specific artist
  .get("/top50/artist/:artist", (req, res) => {
    const artist = top50.filter((song) => {
      return song.artist === req.params.artist;
    })
    if (artist.length == 0) {res.status(404).json({ status: 404, message: "Sorry, artist not found." })
      } else {
        res.status(200).json({ status: 200, data: artist })
      }
    //console.log(req.params)
  })
  //the most popular artists
  .get("/top50/popular-artist", (req, res) => {
    let everyArtistCount = {};

    let topArtist = 0;

    top50.forEach((song) => {
      if (everyArtistCount[song.artist]) {
        everyArtistCount[song.artist].push(song);
      } else {
        everyArtistCount[song.artist] = [song];
      }

      if (topArtist) {
        if (everyArtistCount[song.artist].length >= topArtist.songs.length) {
          topArtist.name = song.artist;
          topArtist.songs = everyArtistCount[song.artist]
        }

      } else {
        topArtist = {
          name: song.artist,
          songs: everyArtistCount[song.artist]
        };
      }
    });
    res.status(200).json({ status: 200, data: topArtist.songs });
  })

  .get("/top50/artist", (req, res) => {
    let artistArr = top50.map((song) => {
      return song.artist
    });
    //removing duplicates
    let setArtist = new Set(artistArr);

    res.status(200).json({ status: 200, data: [...setArtist] });
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
