import React from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

export const Playlist = (props) => {
    const handleChange = (e) => {
        const name = e.target.value;
        props.onNameChange(name)
    }
    return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={handleChange}/>
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;
