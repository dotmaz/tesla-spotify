<template>
  <div class="playlist-card">
    <img :src="playlist.images?.length ? playlist.images[0].url : defaultImage" />
    <p>{{ playlist.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlaylistCard',
  props: {
    playlist: Object
  },
  computed: {
    defaultImage() {
      return this.playlist.name === 'Liked Songs'
        ? 'https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg'
        : 'https://mynoota.com/api/images/__default.png'
    }
  }
}
</script>

<style lang="scss">
.playlist-card {
  min-width: 160px;
  max-width: 160px;
  min-height: 220px;
  max-height: 220px;
  border-radius: 9px;
  margin-bottom: 10px;
  padding: 15px;
  background: #343434;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  * {
    font-family: 'Gabarito';
    user-select: none;
  }

  img {
    width: 130px;
    height: 130px;
    border-radius: 9px;
  }

  p {
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.5em;
    max-height: 3em;
    text-overflow: ellipsis;
  }
}
</style>
