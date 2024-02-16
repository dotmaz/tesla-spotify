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
    <Gallery v-if="state === 'gallery'" :goHome="goHome" />
    <ReccomendationEngine v-if="state === 'engine'" :generatePlaylist="generatePlaylist" :goHome="goHome" />
    <RecommendationPlaylist v-if="state === 'generate'" :newPlaylist="newPlaylist.tracks" :createPlaylist="createPlaylist"
      :addItemsToPlaylist="addItemsToPlaylist" :goHome="goHome" />
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
    tracks: Object,
    queue: Array,
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
        this.newPlaylist = res;
      });
    },

    generatePlaylistQuery() {
      // Input: Array of moods and array of genres (this.moods, this.genres)
      // Output: Query string for /recommendations API (seed_genres and calculated target_attributes from mood)
      let queryString = "";


      // Calculate mood profile
      const customMoodProfile = this.averageMoodProfile(this.moods)

      Object.entries(customMoodProfile).forEach(entry => {
        queryString += `&target_${entry[0]}=${entry[1]}`
      })

      // Calculate all genres
      let allGenres = [];
      this.genres.forEach(genre => {
        if (!this.genreMap[genre]) return;
        allGenres = allGenres.concat(this.genreMap[genre]);
      })

      queryString += `&seed_genres=${allGenres.join(',')}`

      queryString = '?' + queryString.substr(1);

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
