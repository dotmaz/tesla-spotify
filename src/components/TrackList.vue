<template>
  <div
    :class="`track-list ${tracksIsLoading ? 'loading' : ''}`"
    ref="trackList"
    @scroll="handlePlaylistsScrolled"
  >
    <div
      v-for="track in tracks.items"
      :key="track.track.id"
      :class="`track ${track.track.id === activeTrack?.id ? 'active' : ''}`"
      @click="handleTrackClicked(track.track)"
    >
      <div class="track-image">
        <img :src="track.track.album.images[track.track.album.images.length - 1].url" />
      </div>
      <p class="track-name">{{ track.track.name }}</p>
      <p class="track-album">{{ track.track.album.name }}</p>
      <p class="track-artist">
        {{ track.track.artists.map((artist) => artist.name).join(', ') }}
      </p>
      <p class="track-duration">{{ formatDuration(track.track.duration_ms) }}</p>
    </div>
  </div>
</template>

<script>
// import { debounce } from '../js/utils.js' // adjust the path as necessary

export default {
  name: 'TrackList',
  data() {
    return {
      isFetchingTracks: false,
      debouncing: false
    }
  },
  props: {
    tracks: Object,
    queue: Array,
    handleTrackClicked: Function,
    activeTrack: Object,
    tracksIsLoading: Boolean,
    loadMoreTracks: Function
  },
  methods: {
    formatDuration(ms) {
      let totalSeconds = parseInt(ms / 1000)
      const minutes = parseInt(totalSeconds / 60)
      const seconds = parseInt(totalSeconds % 60)

      const minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
      const secondsString = seconds < 10 ? '0' + seconds.toString() : seconds.toString()

      return minutesString + ':' + secondsString
    },
    handlePlaylistsScrolled(e) {
      if (this.isFetchingTracks || !this.tracks.next) return
      if (!this.debouncing) {
        this.debouncing = true
        this.handlePlaylistsScrolledDebounced(e)
        setTimeout(() => {
          this.debouncing = false
        }, 250)
      }
    },
    async handlePlaylistsScrolledDebounced(e) {
      this.isFetchingTracks = true
      const el = e.target
      const scrollPosition = el.scrollTop + el.clientHeight
      const scrollHeight = el.scrollHeight

      if (scrollPosition >= scrollHeight / 2) {
        await this.loadMoreTracks()
      }
      this.isFetchingTracks = false
    }
  }
}
</script>

<style lang="scss">
.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.flipped {
  transform: rotate(180deg);
}
.right {
  transform: rotate(90deg);
}

.track-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-right: 15px;

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.5em;
    max-height: 3em;
    text-overflow: ellipsis;
  }

  &.loading {
    opacity: 0.5;
    pointer-events: none;
  }

  .track {
    width: 100%;
    min-height: 100px;
    padding: 7px 15px 7px 12px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 9px;
    background: #343434;
    cursor: pointer;

    &:hover,
    &:focus {
      background: #444;
    }

    * {
      font-family: 'Gabarito';
    }

    > div {
      display: flex;
      align-items: center;
    }

    > *:not(:last-child) {
      padding-right: 15px;
    }

    > *:not(:first-child) {
      padding-left: 15px;
    }

    .track-image,
    .track-duration {
      flex: 0 0 100px;
    }

    .track-name,
    .track-album,
    .track-artist {
      flex: 1;
    }

    .track-name {
      font-weight: bold;
      font-size: 22px;
      letter-spacing: 0.3px;
    }

    .track-image {
      height: calc(100% - 10px);

      img {
        width: auto;
        height: 100%;
        object-fit: contain;
        border-radius: 9px;
      }
    }

    .track-artist {
      color: #aaa;
    }

    &.active {
      background: #444;
    }
  }
}
</style>
