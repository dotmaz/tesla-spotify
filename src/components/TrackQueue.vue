<template>
  <div class="track-queue">
    <p>Up Next</p>

    <div class="track-queue-body">
      <div class="track-queue-track" v-for="track in queue" :key="track.id">
        <div class="track-queue-track-image">
          <img :src="track.album.images[0].url" />
        </div>
        <p class="track-queue-track-name">
          {{ track.name }}
        </p>
        <p class="track-queue-track-artist">
          {{ track.artist }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackQueue',
  props: {
    queue: Array
  }
}
</script>

<style lang="scss">
/* Queue */
.track-queue {
  width: fit-content;
  height: 100%;
  padding: 10px 15px 10px 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 9px;
  font-weight: bold;
  font-family: 'Gabarito';
  font-size: 20px;
  padding: 15px 0;

  > p {
    text-align: center;
  }

  .track-queue-body {
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    .track-queue-track {
      width: 100px;
      min-height: 150px;
      max-height: 150px;
      margin-bottom: 10px;
      overflow: hidden;

      display: flex;
      flex-direction: column;

      background: #343434;
      padding: 10px;

      .track-queue-track-image {
        width: 100%;

        img {
          width: 100%;
        }
      }

      .track-queue-track-name,
      .track-queue-track-artist {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 1.5em;
        max-height: 3em;
        text-overflow: ellipsis;
        font-size: 14px;
      }
    }
  }
}
</style>
