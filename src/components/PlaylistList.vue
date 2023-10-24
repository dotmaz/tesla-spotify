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

<style lang="scss">
.playlists {
  box-sizing: content-box;
  width: fit-content;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  overflow-y: scroll;
  padding: 15px 0;
}
</style>
