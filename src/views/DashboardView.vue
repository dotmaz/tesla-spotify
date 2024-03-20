<template>
  <div class="content" v-if="profile">
    <!-- <TrackList
      v-if="tracks"
      :profile="profile"
      :tracks="tracks"
      :queue="queue"
      :tracksIsLoading="tracksIsLoading"
      :activeTrack="activeTrack"
      :handleTrackClicked="handleTrackClicked"
      :loadMoreTracks="loadMoreTracks"
    ></TrackList> -->
    <LoadingScreen v-if="state === 'loading'" :finishGeneratePlaylist="finishGeneratePlaylist" />
    <Home v-if="state === 'home'" :profile="profile" :goToGallery="goToGallery" :goToEngine="goToEngine" />
    <Gallery v-if="state === 'gallery'" :goHome="goHome" :playlists="playlists" />
    <ReccomendationEngine v-if="state === 'engine'" :generatePlaylist="generatePlaylist" :goHome="goHome" />
    <RecommendationPlaylist v-if="state === 'generate'" :initializePlaylists="initializePlaylists"
      :newPlaylist="newPlaylist" :createPlaylist="createPlaylist" :addItemsToPlaylist="addItemsToPlaylist"
      :goHome="goHome" />
  </div>
</template>
<script>
import Home from '../components/Home.vue';
import Gallery from '../components/Gallery.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import ReccomendationEngine from '../components/ReccomendationEngine.vue';
import RecommendationPlaylist from '../components/RecommendationPlaylist.vue';
import TrackList from '../components/TrackList.vue'
export default {
  name: 'DashboardView',
  components: {
    TrackList,
    ReccomendationEngine,
    RecommendationPlaylist,
    Home,
    Gallery,
    LoadingScreen
  },
  props: {
    profile: Object,
    playlists: Object,
    tracks: Object,
    queue: Array,
    initializePlaylists: Function,
    handleTrackClicked: Function,
    activeTrack: Object,
    tracksIsLoading: Boolean,
    loadMoreTracks: Function,
    getRecommendedPlaylist: Function,
    createPlaylist: Function,
    addItemsToPlaylist: Function
  },
  data: () => {
    return {
      state: 'engine',
      moods: [],
      genres: [],
      newPlaylist: null,
      genreMap: {
        "Pop": ["pop"],
        "Hip-Hop/Rap": ["hip-hop"],
        "R&B": ["r-n-b"],
        "EDM": ["edm"],
        "Indie": ["indie"],
        "Rock": ["rock"],
        "Country": ["country"],
        "Soul": ["soul"],
        "Ambient": ["ambient"],
        "Classical": ["classical"],
        "Jazz": ["jazz"],
        "Latin": ["latin"]
      },
      moodProfiles: {
        // energy, valence, danceability, acousticness, speechiness, instrumentalness
        "Happy": [0.8, 0.9, 0.7, 0.7, 0.4, 0.4, 0.3],
        "Sad": [0.3, 0.3, 0.2, 0.7, 0.5, 0.5],
        "Peaceful": [0.3, 0.7, 0.3, 0.8, 0.2, 0.7],
        "Anxious": [0.6, 0.3, 0.5, 0.4, 0.6, 0.4],
        "Angry": [0.9, 0.2, 0.3, 0.2, 0.7, 0.3],
        "Grief": [0.2, 0.2, 0.2, 0.7, 0.5, 0.6],
        "Fear": [0.5, 0.1, 0.3, 0.3, 0.4, 0.5],
        "Confusion": [0.4, 0.4, 0.4, 0.5, 0.6, 0.4],
        "Shame": [0.3, 0.3, 0.3, 0.6, 0.7, 0.4],
        "Hope": [0.6, 0.8, 0.6, 0.5, 0.4, 0.4],
        "Excitement": [0.8, 0.9, 0.7, 0.3, 0.5, 0.3]
      }
    }
  },
  methods: {
    generatePlaylist(data) {
      this.moods = data.moods;
      this.genres = data.genres;
      this.state = 'loading'; // Mount loading screen, will start animation; at end of animation it runs finishGeneratePlaylist
      const playlistQuery = this.generatePlaylistQuery();
      this.getRecommendedPlaylist(playlistQuery).then(res => {
        this.newPlaylist = this.getRandom(res.tracks, 20);
      });
    },

    generatePlaylistQuery() {
      // Input: Array of moods and array of genres (this.moods, this.genres)
      // Output: Query string for /recommendations API (seed_genres and calculated target_attributes from mood)
      let queryString = "";
      if (this.moods.length) {
        // Calculate mood profile
        const customMoodProfile = this.averageMoodProfile(this.moods)

        Object.entries(customMoodProfile).forEach(entry => {
          queryString += `&target_${entry[0]}=${entry[1]}`
        })
      }

      if (this.genres.length) {
        // Calculate all genres
        let allGenres = [];
        this.genres.forEach(genre => {
          if (!this.genreMap[genre]) return;
          allGenres = allGenres.concat(this.genreMap[genre]);
        })

        queryString += `&seed_genres=${allGenres.join(',')}`
      }

      if (this.genres.length || this.moods.length) {
        queryString = '?' + queryString.substr(1);
      }
      return queryString;
    },

    finishGeneratePlaylist() {
      // Check for completed playlist query; and will stall until it completes
      if (!this.newPlaylist) {
        setTimeout(this.finishGeneratePlaylist, 5000); // Check every second
        return;
      }
      this.state = 'generate';
    },

    averageMoodProfile(moods) {
      const sumProfile = {
        energy: 0,
        valence: 0,
        danceability: 0,
        acousticness: 0,
        speechiness: 0,
        instrumentalness: 0,
      };
      const count = moods.length;

      moods.forEach(mood => {
        if (this.moodProfiles[mood]) {
          Object.keys(sumProfile).forEach((key, idx) => {
            sumProfile[key] += this.moodProfiles[mood][idx];
          });
        }
      });

      // Calculate the average for each property
      const averageProfile = {};
      Object.keys(sumProfile).forEach(key => {
        averageProfile[key] = parseFloat(sumProfile[key] / count).toFixed(2);
      });

      return averageProfile;
    },

    getRandom(A, N){
      // Check if the request is for more items than are available
      if (N > A.length) {
          console.log('Requested more items than are available in the array. Returning the full array.');
          return A;
      }
      
      // Creating a shallow copy of A to preserve the original array
      let arrayCopy = A.slice();
      for (let i = arrayCopy.length - 1; i > 0; i--) {
          // Generate a random index
          const j = Math.floor(Math.random() * (i + 1));
          // Swap elements at indices i and j
          [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
      }
      
      // Return the first N elements from the shuffled array
      return arrayCopy.slice(0, N);
    },

    goHome() {
      this.state = 'home';
    },

    goToGallery() {
      this.state = 'gallery';
    },

    goToEngine() {
      this.state = 'engine';
    }
  }
}
</script>
