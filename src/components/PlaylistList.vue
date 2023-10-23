<template>
  <div class="playlists">
    <PlaylistCard
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      @click="handlePlaylistClicked(playlist)"
      :class="`${playlist.id === activePlaylist?.id ? 'active' : ''}`"
    ></PlaylistCard>
  </div>
</template>

<script>
import PlaylistCard from './PlaylistCard.vue'

export default {
  name: 'PlaylistList',
  props: {
    playlists: Array,
    handlePlaylistClicked: Function,
    activePlaylist: Object
  },
  components: { PlaylistCard }
}
</script>

<style>
.playlists {
  box-sizing: content-box;
  width: fit-content;
  height: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
</style>
