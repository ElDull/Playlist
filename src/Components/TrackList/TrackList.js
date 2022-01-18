import React from "react";
import './TrackList.css';
import Track from '../Track/Track';
export default class TrackList extends React.Component {
    render() {
        const listOfTracks = this.props.tracks.map((track, key) => {
           return <Track key={key} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
        });
        return (    
        <div className="TrackList">
            {listOfTracks}
        </div>
        )
    }
}