<template>
    <div class="playlist">
        <img class="playlist-image" :src="playlist.images[0].url">
        <div class="row">
            <div class="column">
                <span class="name">{{ playlist.name.replace(" | Therasonic", "") || "Untitled Playlist" }}</span>
                <span class="moods">Mood(s)</span>
            </div>
        </div>
        <span class="date">{{ playlist.description.split(' | ')[1] }}</span>
    </div>
</template>
<script>
export default {
    name: 'Playlist Item',
    components: {
    },
    props: {
        playlist: Object
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
        color: var(--color-text)!important;
    }

    .date {
        margin-left: auto;
    }

    .playlist-image {
        width: 60px;
        height: 60px;
        margin-right: 15px;
        border-radius: 7px;
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