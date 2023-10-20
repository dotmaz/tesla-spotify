<template>
  <div v-if="profile">
    <NavigationBar>
      <ButtonPrimary :handler="logout">Logout</ButtonPrimary>
      <ProfileCard :profile="profile"></ProfileCard>
    </NavigationBar>
    <div class="content">
      <PlaylistList :playlists="playlists" :activePlaylist="activePlaylist" :handlePlaylistClicked="handlePlaylistClicked"></PlaylistList>
      <TrackList v-if="tracks" :tracks="tracks" :tracksIsLoading="tracksIsLoading" :activeTrack="activeTrack" :handleTrackClicked="handleTrackClicked"></TrackList>
    </div>
    
  </div>
</template>

<script>
import ButtonPrimary from "./ButtonPrimary.vue"
import NavigationBar from "./NavigationBar.vue"
import PlaylistList from "./PlaylistList.vue";
import ProfileCard from "./ProfileCard.vue"
import TrackList from "./TrackList.vue";

export default {
  name: 'DashboardView',
  components: {
    ProfileCard,
    NavigationBar,
    ButtonPrimary,
    TrackList,
    PlaylistList
},
  props: {
    profile: Object,
    tracks: Array,
    playlists: Array,
    logout: Function,
    handleTrackClicked: Function,
    handlePlaylistClicked: Function,
    activeTrack: Object,
    activePlaylist: Object,
    tracksIsLoading: Boolean
  }
}
</script>

<style>
.content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 40px 40px;
  height: calc(100vh - 80px); /* 80px nav, 80px padding */
}
</style>