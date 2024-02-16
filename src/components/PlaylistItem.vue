<template>
    <div class="playlist">
        <img class="playlist-image" src="../assets/playlist.png">
        <div class="row">
            <div class="column">
                <span class="name">Playlist Name</span>
                <span class="moods">Mood(s)</span>
            </div>
        </div>
        <span class="date">1/8/27</span>
    </div>
</template>
<script>
export default {
    name: 'Playlist Item',
    components: {
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
.playlist {
    display: flex;
    flex-direction: row;

    width: 100%;

    .name,
    .date {
        font-family: Inter;
        font-weight: 900;
    }

    .date {
        margin-left: auto;
    }

    .playlist-image {
        width: 60px;
        height: 60px;
        margin-right: 15px;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
        flex-direction: row;
    }
}
</style>