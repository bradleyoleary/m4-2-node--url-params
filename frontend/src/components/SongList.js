import React from 'react';
import styled from 'styled-components';
import SongListItem from './SongListItem';

//rendering ul and passing a prop of songs - will destructure
let SongList = (props) => {
    const { songs } = props;
    //console.log(props)
    const allSongs = songs;
    //console.log(allSongs)
    return  allSongs ? (<Ul>
            {allSongs.map((songInfo) => {
                return (
                    <SongListItem 
                        rank={songInfo.rank}
                        song={songInfo.title}
                        artist={songInfo.artist}
                        streams={songInfo.streams}
                        publicationDate={songInfo.publicationDate}
                        key={songInfo.rank}
                    />
                );
            })}
        </Ul>): (<div>Loading...</div>)
};

const Ul = styled.ul`
`;

export default SongList; 