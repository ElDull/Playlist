import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'
export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.results} onAdd={this.props.onAdd} isRemoval={false}/>
            </div>
        )
    }
}



