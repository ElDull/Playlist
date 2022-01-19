import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

export const TrackList = (props) => {
    const listOfTracks = props.tracks.map((track, key) => {
        return <Track key={key} track={track} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval}/>
     });
     return (    
     <div className="TrackList">
         {listOfTracks}
     </div>
     )
}

export default TrackList;