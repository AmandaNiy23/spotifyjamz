import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks
    if(!tracks.includes(track.id)){
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    }
    return;
  }

  removeTrack(track){
    let currentPlaylistState = this.state.playlistTracks;
    let newPlaylistState = currentPlaylistState.filter(index => index.id !== track.id);
    this.setState({playlistTracks: newPlaylistState})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    if(tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map(trackIndex => trackIndex.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        document.getElementById('Playlist-name').value = this.state.playlistName;
      });
    }
  }

  search(term){
    console.log('search location #1')
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    });
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>z</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
          <h6 className="photo-credit">Photo by Marcela Laskoski on Unsplash</h6>
        </div>
      </div>
    )
  }
}

export default App;
