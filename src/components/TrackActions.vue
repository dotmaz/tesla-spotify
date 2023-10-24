<template>
  <div class="track-actions">
    <div @click="scrollToTop" class="track-action">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </div>
    <div @click="scrollToBottom" class="track-action flipped">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </div>
    <div @click="togglePlaylistsSidebar" class="track-action">
      <font-awesome-icon :icon="['fas', 'compact-disc']" />
    </div>
    <div @click="toggleQueueSidebar" class="track-action">
      <font-awesome-icon :icon="['fas', 'list']" />
    </div>
    <div @click="logout" class="track-action" id="logout-action">
      <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackActions',
  props: {
    logout: Function,
    togglePlaylistsSidebar: Function,
    toggleQueueSidebar: Function
  },
  methods: {
    scrollToBottom() {
      document.querySelector('.track-list').scroll({
        top: document.querySelector('.track-list').scrollHeight,
        behavior: 'smooth'
      })
    },
    scrollToTop() {
      document.querySelector('.track-list').scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss">
/* Track Actions */
.track-actions {
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  .track-action {
    margin: 5px 0;
    cursor: pointer;
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    background: #333;

    &:hover,
    &:active {
      filter: brightness(1.2);
    }

    svg {
      width: 30px;
      height: 30px;
    }
  }
}

#logout-action {
  margin-top: auto;
  background: indianred;

  &:hover,
  &:active {
    filter: brightness(1.1);
  }
}
</style>
