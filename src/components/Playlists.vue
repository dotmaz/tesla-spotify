<template>
    <div class="playlists">
        <PlaylistItem v-for="playlist in filteredPlaylists" :playlist="playlist" />
        <h2 v-if="!filteredPlaylists?.length">No playlists yet!</h2>
    </div>
</template>
<script>
import PlaylistItem from './PlaylistItem.vue';
export default {
    name: 'Playlists',
    components: {
        PlaylistItem
    },
    props: {
        playlists: Object
    },
    data: () => {
        return {
        }
    },
    computed: {
        filteredPlaylists() {
            return this.playlists.filter(playlist => playlist.description?.includes('Therasonic'))
        }
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.playlists {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    z-index: 2;
    margin: 0 auto;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
}

h2 {
    width: fit-content;
    margin: 0 auto;
    font-weight: bold;
    font-family: Inter;
    opacity: 0.8;
}
</style>