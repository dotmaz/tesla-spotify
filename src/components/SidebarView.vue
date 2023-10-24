<template>
  <div :class="`sidebar ${activeSidebar ? 'open' : ''}`" ref="sidebar">
    <PlaylistList
      v-if="activeSidebar === 'playlists'"
      :playlists="playlists"
      :activePlaylist="activePlaylist"
      :handlePlaylistClicked="handlePlaylistClicked"
    ></PlaylistList>
    <TrackQueue v-else-if="activeSidebar === 'queue'" :queue="queue"></TrackQueue>
  </div>
</template>

<script>
import PlaylistList from './PlaylistList.vue'
import TrackQueue from './TrackQueue.vue'

export default {
  name: 'SidebarView',
  props: {
    activeSidebar: String,
    handlePlaylistClicked: Function,
    activePlaylist: Object,
    playlists: Array,
    queue: Array
  },
  components: {
    PlaylistList,
    TrackQueue
  }
}
</script>

<style lang="scss">
.sidebar {
  height: 100%;
  width: 0px;
  border-left: 2px solid #444;
  transition-duration: 0.15s;

  &.open {
    width: fit-content;
    padding: 0 15px;
  }
}
</style>
