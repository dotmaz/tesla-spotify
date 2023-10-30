<template>
  <div v-if="profile">
    <div class="content">
      <TrackActions
        :logout="logout"
        :togglePlaylistsSidebar="togglePlaylistsSidebar"
        :toggleQueueSidebar="toggleQueueSidebar"
      ></TrackActions>
      <TrackList
        v-if="tracks"
        :tracks="tracks"
        :queue="queue"
        :tracksIsLoading="tracksIsLoading"
        :activeTrack="activeTrack"
        :handleTrackClicked="handleTrackClicked"
        :logout="logout"
      ></TrackList>
      <SidebarView
        :activeSidebar="activeSidebar"
        :playlists="playlists"
        :queue="queue"
        :activePlaylist="activePlaylist"
        :handlePlaylistClicked="handlePlaylistClicked"
      ></SidebarView>
    </div>
  </div>
</template>

<script>
import TrackList from '../components/TrackList.vue'
import TrackActions from '../components/TrackActions.vue'
import SidebarView from '../components/SidebarView.vue'

export default {
  name: 'CarDashboardView',
  components: {
    TrackList,
    TrackActions,
    SidebarView
  },
  props: {
    profile: Object,
    tracks: Array,
    queue: Array,
    playlists: Array,
    logout: Function,
    handleTrackClicked: Function,
    handlePlaylistClicked: Function,
    activeTrack: Object,
    activePlaylist: Object,
    tracksIsLoading: Boolean,
    activeSidebar: String,
    togglePlaylistsSidebar: Function,
    toggleQueueSidebar: Function
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
}
</style>
