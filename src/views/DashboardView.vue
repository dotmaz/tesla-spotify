<template>
  <div class="content" v-if="profile">
    <TrackList
      v-if="tracks"
      :profile="profile"
      :tracks="tracks"
      :queue="queue"
      :tracksIsLoading="tracksIsLoading"
      :activeTrack="activeTrack"
      :handleTrackClicked="handleTrackClicked"
      :loadMoreTracks="loadMoreTracks"
    ></TrackList>
  </div>
</template>
<script>
import TrackList from '../components/TrackList.vue'
export default {
  name: 'DashboardView',
  components: {
    TrackList
  },
  props: {
    profile: Object,
    tracks: Object,
    queue: Array,
    handleTrackClicked: Function,
    activeTrack: Object,
    tracksIsLoading: Boolean,
    loadMoreTracks: Function
  }
}
</script>
