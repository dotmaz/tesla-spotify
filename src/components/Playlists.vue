<template>
    <div class="playlists">
        <PlaylistItem />
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
    },
    data: () => {
        return {
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
    z-index: 2;
    margin: 0 auto;
    width: 300px;
    box-sizing: border-box;
}
</style>