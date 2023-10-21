<template>
  <div class="tracks-container">
    <div :class="`track-list ${tracksIsLoading ? 'loading' : ''}`" ref="trackList">
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
    <div class="track-actions">
      <div @click="scrollToTop" class="track-action">
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </div>
      <div @click="scrollToBottom" class="track-action flipped">
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
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
    },
    scrollToBottom(){
      this.$refs.trackList.scrollTo({
        top: this.$refs.trackList.scrollHeight,
        behavior: 'smooth'
      })
    },
    scrollToTop(){
      this.$refs.trackList.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>
html{
  transform: scale(0.75);
}
.tracks-container{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
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

.track-list p{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.5em;
  max-height: 3em;
  text-overflow: ellipsis;
}

.track-list.loading{
  opacity: 0.5;
  pointer-events: none;
}


.track-list::-webkit-scrollbar {
    width: 0;
}
.track-list::-webkit-scrollbar-thumb, .track-list::-webkit-scrollbar-track {
    display: none;
}

.track{
  width: 100%;
  min-height: 100px;
  padding: 7px;
  padding-left: 12px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 9px;
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
  padding-right: 15px;
}

.track>*:not(:first-child){
  padding-left: 15px;
}

.track-image, .track-duration{
  flex: 0 0 100px;
}
.track-name, .track-album, .track-artist{
  flex: 1;
}

.track-name{
  font-weight: bold;
  font-size: 22px;
  letter-spacing: 0.3px;
}

.track-image{
  height: calc(100% - 10px);
}

.track-image img{
  width: auto;
  height: 100%;
  object-fit: contain;
  border-radius: 9px;
}

.track-artist{
  color: #aaa;
}

.active{
  background: #444;
}


/* Track Actions */

.track-actions{
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}

.track-action{
  margin: 5px 0;
  cursor: pointer;
  width: 45px;
  height: 45px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
}

.track-action:hover, .track-action:focus{
  background: #444;
}

.track-action svg{
    width: 30px;
    height: 30px;
}

.flipped{
  transform: rotate(180deg);
}
</style>