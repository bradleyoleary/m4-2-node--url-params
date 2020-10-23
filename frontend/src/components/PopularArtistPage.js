import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import SongList from "./SongList";

const PopularArtistPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/top50/popular-artist")
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data);
      });
  }, []);

  //console.log("PopularArtistPage.js: songs: ", songs);
  console.log(songs)
  return songs ?(
    <>
      <Header pageTitle="Most Popular Artist" />
      <SongList songs={songs} />
    </>
  ): <div>Loading...</div>
};

export default PopularArtistPage;
