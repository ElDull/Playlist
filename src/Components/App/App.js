import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SeachResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      SearchResults:[],
      playlistName: "New Playlist",
      playlistTracks: [],
    }
  }
  async search(term) {
    const results = await Spotify.search(term);
    this.setState({SearchResults: results});
    console.log(this.state.SearchResults)
  }
  async savePlaylist(){
    const name = this.state.playlistName;
    const uris = [];
    if (this.state.playlistTracks.length > 0){
      this.state.playlistTracks.forEach((track) => {
        uris.push(track.uri)
      })
    }
    const snapshot_id = await Spotify.savePlaylist(name, uris);
    this.setState({playlistName:"New Playlist",playlistTracks:[]})
    return snapshot_id;
  }
  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }
  removeTrack(track){
    const newPlaylist = this.state.playlistTracks.filter((element) => element.id === track.id)
    this.setState({playlistTracks: newPlaylist});
  }
  addTrack(track){
    if (this.state.playlistTracks.length > 0){
      let add = true;
      for (let i=0; i<this.state.playlistTracks.length; i++){
        let currTrack = this.state.playlistTracks[i];
        if (currTrack.id === track.id){
            add = false;
        }
      }
      if (add){
        console.log("Not in playlist");
        this.setState({playlistTracks: [...this.state.playlistTracks, track] })
      }
    } else {
      console.log("entered else")
      this.setState({playlistTracks: [track]})
    }
    console.log(this.state)
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            {/* Add a SearchBar component */}
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults results={this.state.SearchResults} onAdd={this.addTrack}/>
            {/* Add a Playlist component */}
            <Playlist name={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
  
}
export default App;
