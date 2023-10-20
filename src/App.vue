<template>
  <DashboardView v-if="loggedIn"  
    :profile="profile"
    :playlists="playlists"
    :tracks="activePlaylist && activePlaylist.id !== 0 && playlistTracks ? playlistTracks : savedTracks?.items"
    :tracksIsLoading="tracksIsLoading"
    :activeTrack="activeTrack"
    :activePlaylist="activePlaylist"
    :logout="logout"
    :handleTrackClicked="handleTrackClicked"
    :handlePlaylistClicked="handlePlaylistClicked">
  </DashboardView>
  <div v-else class="login-container" >
    <ButtonPrimary :handler="()=>{login(true)}">Login</ButtonPrimary>
  </div>
</template>

<script>
import ButtonPrimary from "./components/ButtonPrimary.vue";
import DashboardView from "./components/DashboardView.vue"

export default {
  name: 'App',
  components: {
    DashboardView,
    ButtonPrimary
},
  data(){
    return {
      clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
      accessToken: null,
      tokenExpiration: null,
      loggedIn: false,
      initialized: false,
      profile: null,
      playlists: null,
      activePlaylist: null,
      savedTracks: null,
      playlistTracks: null,
      activeTrack: null,
      tracksIsLoading: true,
      playbackState: null,
      allowPolling: true,
    }
  },
  methods: {
    /* AUTHORIZATION */
    generateRandomString(length) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },

    async generateCodeChallenge(codeVerifier) {
      function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);

      return base64encode(digest);
    },

    // Redirect to spotify auth
    requestCredentials(){
      let codeVerifier = this.generateRandomString(128);
      this.generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = this.generateRandomString(16);
        let scope = 'user-read-private user-read-email playlist-read-private user-library-read user-modify-playback-state user-read-playback-state streaming';

        localStorage.setItem('code_verifier', codeVerifier);

        let args = new URLSearchParams({
          response_type: 'code',
          client_id: this.clientId,
          scope: scope,
          redirect_uri: this.redirectUri,
          state: state,
          code_challenge_method: 'S256',
          code_challenge: codeChallenge
        });

        window.location = 'https://accounts.spotify.com/authorize?' + args;
      });
    },

    // Request and store access token
    requestAccessToken(code){
      let codeVerifier = localStorage.getItem('code_verifier');
      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        code_verifier: codeVerifier
      })

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() + data.expires_in/60/60)
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_expiration', expirationDate.toISOString())
        this.accessToken = data.access_token;
        this.loggedIn = true;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },

    // Refresh and store access token
    async refreshAccessToken(){
      const localRefreshToken = localStorage.getItem('refresh_token')
      let body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        refresh_token: localRefreshToken
      })

      await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() + data.expires_in/60/60)
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_expiration', expirationDate.toISOString())
        this.accessToken = data.access_token;
        this.loggedIn = true;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },

    // Perform whole auth flow
    async login(requestCredentials){
      // Check local tokens
      const localAccessToken = localStorage.getItem('access_token')
      const localRefreshToken = localStorage.getItem('refresh_token')
      const localExpirationDate = localStorage.getItem('token_expiration')
      if(localExpirationDate && new Date() < new Date(localExpirationDate)){
        this.accessToken = localAccessToken;
        this.tokenExpiration = localExpirationDate;
        this.loggedIn = true;
        return;
      }

      // Check for refresh token
      if(localRefreshToken){
        await this.refreshAccessToken();
        const newLocalExpirationDate = localStorage.getItem('token_expiration')
        if(new Date() < new Date(newLocalExpirationDate)) return;
      }
      // No local tokens found, do step 2 of auth flow
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code')
      if(code){
        this.requestAccessToken(code);
        return;
      }
      if(!requestCredentials) return;
      // Step 1 of auth flow
      this.requestCredentials();
    },

    logout(){
      localStorage.clear();
      window.location.href = "/"
    },

    clearQueryParams() {
        let location = window.location.toString();
        let baseUrl = location.split('?')[0];
        history.replaceState(null, null, baseUrl);
    },

    /* INITIALIZATION */


    // Initialize all needed data once logged in
    async initializeInformation(){
      this.clearQueryParams();
      this.profile = await this.getProfile();
      this.playbackState = await this.getPlaybackState();
      console.log(this.playbackState)
      this.playlists = [{name: "Liked Songs", id: 0, uri: `spotify:user:${this.profile.display_name}:collection`}, ...((await this.getPlaylists()).items)];
      this.activePlaylist = this.playlists[0];
      this.savedTracks = await this.getSavedTracks();
      this.tracksIsLoading = false;
      setInterval(this.pollPlaybackState, 1000)

      // Get all saved tracks
      while(this.savedTracks.next){
        const nextTracks = await this.getSavedTracks(this.savedTracks.next)
        this.savedTracks.next = nextTracks.next;
        this.savedTracks.items = this.savedTracks.items.concat(nextTracks.items);
      }
    },

    // Poll for playback state, not allowing data change when disabled for UI purposes
    async pollPlaybackState(){
      if(!this.allowPolling) return;
      this.playbackState = await this.getPlaybackState();
      if(!this.allowPolling) return;
      this.activeTrack = this.playbackState.item;

      // Throwing in date check to refresh access token mid-session
      if(new Date() > new Date(this.tokenExpiration)){
        this.refreshAccessToken();
      }
    },

    
    /* HANDLERS */

    async handleTrackClicked(track){
      // Disable polling while clicking to prevent UI flickering
      this.allowPolling = false;
      this.activeTrack = track;
      await this.playTrack(track.uri, this.activePlaylist?.uri)
      this.allowPolling = true;
    },

    async handlePlaylistClicked(playlist){
      this.tracksIsLoading = true;
      if(playlist.name === "Liked Songs"){
        this.activePlaylist = this.playlists[0];
        this.tracksIsLoading = false;
        document.querySelector('.track-list').scroll({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      this.activePlaylist = playlist;
      const tracks = await this.getPlaylistTracks(playlist.tracks.href);
      let tracksNext = tracks.next;
      this.playlistTracks = tracks.items;
      this.tracksIsLoading = false;
      document.querySelector('.track-list').scroll({
        top: 0,
        behavior: 'smooth'
      });
      
      // Get all playlist tracks
      while(tracksNext){
        const nextTracks = await this.getPlaylistTracks(tracksNext)
        tracksNext = nextTracks.next;
        this.playlistTracks = this.playlistTracks.concat(nextTracks.items);
      }
    },

    

    /* API */
    async getProfile() {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + this.accessToken
        }
      });

      if(response.status === 204) return true;
      const data = await response.json();
      return data;
    },

    async getPlaylists() {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + this.accessToken
        }
      });

      if(response.status === 204) return true;
      const data = await response.json();
      return data;
    },

    async getSavedTracks(nextURL) {
      const response = await fetch(nextURL ? nextURL : 'https://api.spotify.com/v1/me/tracks?limit=50', {
        headers: {
          Authorization: 'Bearer ' + this.accessToken
        }
      });

      if(response.status === 204) return true;
      const data = await response.json();
      return data;
    },

    async getPlaybackState() {
      const response = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          Authorization: 'Bearer ' + this.accessToken
        }
      });

      if(response.status === 204) return true;
      const data = await response.json();
      return data;
    },

    async getPlaylistTracks(url){
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + this.accessToken
        }
      });

      if(response.status === 204) return true;
      const data = await response.json();
      return data;
    },

    async playTrack(trackUri, contextUri) {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.accessToken
        },
        body: JSON.stringify({
          context_uri: contextUri,
          offset: {
            'uri': trackUri
          }
        })
      });

      if(response.status === 204) return true;
      return false;
    },
    
  },

  mounted(){
    // Automatically login every time you open the app
    this.login()
  },

  watch: {
    accessToken(val){
      if(val){
        if(this.initialized) return;
        this.initialized = true;
        this.initializeInformation();
      }
    }
  }
}
</script>
<style>
.login-container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>