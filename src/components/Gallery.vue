<template>
    <div class="gallery">
        <div class="design" id="design-1"></div>
        <div class="design" id="design-2"></div>
        <img class="back" src="../assets/back.png" @click="goHome" />
        <h1 class="title">Gallery</h1>
        <Playlists :playlists="playlists" />
    </div>
</template>
<script>
import Playlists from './Playlists.vue';
export default {
    name: 'Gallery',
    components: {
        Playlists
    },
    props: {
        goHome: Function,
        playlists: Object
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
.gallery {
    z-index: 1;
    background: #E5FFE4;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    .back {
        width: 65px;
        position: fixed;
        top: 53px;
        left: 30px;
        z-index: 1;
    }

    .title {
        font-family: Inter;
        font-size: 50px;
        font-weight: 900;
        color: black;
        width: fit-content;
        margin: 40px auto;
        z-index: 1;
    }
}


.design {
    width: 450px;
    height: 450px;
    border-radius: 50%;
    position: absolute;
    z-index: 0;
}

#design-1 {
    background-color: #A3D49B;
    top: -200px;
    left: -250px;
    opacity: 0.5;
}

#design-2 {
    background-color: #7BB472;
    top: 400px;
    right: -230px;
}
</style>