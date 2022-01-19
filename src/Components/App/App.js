import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SeachResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React, { useState } from 'react';
import Spotify from '../../util/Spotify';

const App = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = async(term) => { // Searches for term in Spotify's API and sets the results in state.
    const results = await Spotify.search(term);
    setSearchResults(results);
  }

  const savePlaylist = async() => {
    const name = playlistName;
    const uris = [];
    if (playlistTracks.length > 0){
        playlistTracks.forEach((track) => {
        uris.push(track.uri);
      })
    }
    await Spotify.savePlaylist(name, uris);
    // Reset State
    setPlaylistName("New Playlist");
    setPlaylistTracks([])
  }

  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  }
  const removeTrack = (track) => {
    const newPlaylist = playlistTracks.filter((element) => element.id !== track.id)
    setPlaylistTracks(newPlaylist);
  }
  const addTrack = (track) => {
    if (playlistTracks.length > 0){
      let add = true;
      for (let i = 0; i< playlistTracks.length; i++){
        let currTrack = playlistTracks[i];
        if (currTrack.id === track.id){
            add = false;
        }
      }
      if (add){
        setPlaylistTracks([...playlistTracks, track]);
      }
    } else {
      setPlaylistTracks([track]);
    }
  }
  return (
    <div>
      <h1>Play<span className="highlight">list</span></h1>
        <div className="App">
          <SearchBar onSearch={search}/>
          <div className="App-playlist">
          <SearchResults results={searchResults} onAdd={addTrack}/>
          <Playlist name={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  )
}


export default App;
