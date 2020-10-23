import React from 'react';
import styled from 'styled-components';

const SongListItem = (props) => {
    const { rank, song, artist, streams, publicationDate } = props;

    return (
        <Li>
            <Wrapper>
                <Rank> <p className="rankNum">#{rank}</p> <p className="streamsNum">({streams} streams)</p></Rank>
                <SongTitle><p className="songName">{song}</p> <p className="artistName">by {artist}</p></SongTitle>
                <PublicationDate>publication date: {publicationDate}</PublicationDate>
            </Wrapper>
        </Li>
    );
};

const Li = styled.li`
`

const Wrapper = styled.div`
    display: flex;
    margin: 20px;
    padding: 20px;
    border-bottom: 1px grey solid;
`

const Rank = styled.div`
    & .rankNum {
        font-size: 3em;
    }
    & .streamsNum {
        font-size: .9em;
        color: #959595;
    }
` 

const SongTitle = styled.div`
    margin-left: 44px;
    width: 65%;

    & .songName {
        font-weight: bold;
        font-size: 1.2em;
    }

    & .artistName {
        font-size: 1.2em;
        font-style: italic;
        color: #959595;
    }
`

const PublicationDate = styled.div`
   align-self: flex-end;
   margin-left: 44px
`;

export default SongListItem;