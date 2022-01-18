let accessToken;
const clientID = require('../secret.json').clientID
const redirectURI = "http://localhost:3000";
const Spotify = {
    getAcessToken(){
        if (accessToken){
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    async search(term) {
        const accessToken = this.getAcessToken()
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const authHeader = {'Authorization': `Bearer ${accessToken}`};
        const response = await fetch(endpoint, {headers:authHeader});
        const responseJson = await response.json();
        if (!responseJson.tracks){
            return [];
        }
        return responseJson.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
    },
    async getUserID() {
        const accessToken = this.getAcessToken()
        const endpoint = `https://api.spotify.com/v1/me`;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch(endpoint, {headers:headers});
        const responseJson = await response.json();
        if (!responseJson.id){
            return "";
        } else {
            return responseJson.id;
        }
    },
    async createNewPlaylist(playlistName) {
        const userID = await this.getUserID()
        const accessToken = this.getAcessToken()
        const endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const reqBody = {
            name:playlistName
        };
        const response = await fetch(endpoint, {method:"POST", headers:headers, body:JSON.stringify(reqBody)});
        const responseJson = await response.json();
        return responseJson.id
    },
    async savePlaylist(name, trackURIS) {
        const accessToken = this.getAcessToken()
        const playlistID = await this.createNewPlaylist(name);
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const reqBody = {
            uris:trackURIS
        };
        const response = await fetch(endpoint, {method:"POST", headers:headers, body:JSON.stringify(reqBody)});
        const responseJson = await response.json();
        return responseJson.snapshot_id;
    }
};


Spotify.getAcessToken()
 export default Spotify;