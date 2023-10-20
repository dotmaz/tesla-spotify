<template>
  <div class="tracks-container">
    <div :class="`track-list ${tracksIsLoading ? 'loading' : ''}`">
      <div v-for="track in tracks" :key="track.track.id" :class="`track ${track.track.id === activeTrack?.id ? 'active' : ''}`" @click="handleTrackClicked(track.track)">
        <div class="track-image">
          <img :src="track.track.album.images[track.track.album.images.length-1].url" />
        </div>
        <p class="track-name">{{ track.track.name }}</p>
        <p class="track-album">{{ track.track.album.name }}</p>
        <p class="track-artist">{{ track.track.artists.map(artist=>artist.name).join(', ') }}</p>
        <p class="track-duration">{{ formatDuration(track.track.duration_ms) }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'TrackList',
  props: {
    tracks: Array,
    handleTrackClicked: Function,
    activeTrack: Object,
    tracksIsLoading: Boolean
  },
  methods: {
    formatDuration(ms){
      let totalSeconds = parseInt(ms/1000)
      const minutes = parseInt(totalSeconds/60)
      const seconds = parseInt(totalSeconds%60)

      const minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
      const secondsString = seconds < 10 ? '0' + seconds.toString() : seconds.toString()

      return minutesString + ':' + secondsString
    }
  }
}
</script>

<style>
.tracks-container{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.track-list{
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.track-list *{
  user-select: none;
}

.track-list.loading{
  opacity: 0.5;
  pointer-events: none;
}

.track{
  width: 100%;
  min-height: 70px;
  padding: 7px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;
  background: #343434;

  cursor: pointer;
}

.track-list .track:hover, .track-list .track:focus{
  background: #444;
}

.track *{
  font-family: 'Gabarito';
}

.track > div{
  display: flex;
  align-items: center; 
}

.track>*:not(:last-child){
  padding-right: 10px;
}

.track>*:not(:first-child){
  padding-left: 10px;
}

.track-image, .track-duration{
  flex: 0 0 70px;
}
.track-name, .track-album, .track-artist{
  flex: 1;
}

.track-name{
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.3px;
}

.track-image{
  height: 100%;
}

.track-image img{
  width: auto;
  height: 100%;
  object-fit: contain;
  border-radius: 3px;
}

.track-artist{
  color: #aaa;
}

.active{
  background: #444;
}


/* .track-list-header{
  width: 100%;
  height: fit-content;
  position: absolute;
  top: -55px;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  
}

.track-list-header .track{
  background: none;
}

.track-list-header *{
  color: #eee!important;
  font-weight: bold!important;
} */
</style>
    <!-- <div class="track-list-header">
      <div class="track">
        <div class="track-image"></div>
        <p class="track-name">Song</p>
        <p class="track-album">Album</p>
        <p class="track-artist">Artist</p>
        <p class="track-duration">Time</p>
      </div>
    </div> -->