<template>
    <div class="recommendation-playlist">
        <h1>Here’s your music therapy for the day!</h1>
        <img src="../assets/playlist.png" />
        <input type="text" placeholder="Playlist #01" />
        <div class="seperator"></div>
        <div class="actions">
            <PrimaryButton :backgroundColor="`#B9F8AF`" :borderColor="`transparent`">
                Add to Playlist
            </PrimaryButton>
            <PrimaryButton :backgroundColor="`#1DB954`" :borderColor="`transparent`">
                Add to Spotify <img id="spotify" src="../assets/spotify.png" />
            </PrimaryButton>
        </div>
        <div class="seperator"></div>
        <div class="actions">
            <PrimaryButton :backgroundColor="`#6AF1D1`" :borderColor="`transparent`" :small="true">
                Refresh
            </PrimaryButton>
        </div>
        <div class="playlist">
            <div v-if="newPlaylist" v-for="song in newPlaylist" class="song">
                <img class="song-img" :src="song?.album?.images?.[0]?.url">
                <div class="song-info">
                    <p class="song-title">{{ song?.name }}</p>
                    <p class="song-artist">{{ song?.artists?.[0]?.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PrimaryButton from './PrimaryButton.vue';
export default {
    name: 'ReccomendationPlaylist',
    components: {
        PrimaryButton
    },
    props: {
        newPlaylist: Array
    },
    data: () => {
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="scss">
.recommendation-playlist {
    background: #1B2618;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: scroll;
    padding-top: 50px;

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    h1 {
        color: #85DB77;
        font-weight: bold;
        width: 300px;
        line-height: 50px;
        font-size: 40px;
        text-align: center;
        font-family: Inter;
        font-weight: 900;
    }

    img {
        margin: 40px 0;
    }

    input[type=text] {
        background: none;
        color: white;
        border: none;
        border-bottom: 4px solid rgba(255, 255, 255, .2);
        width: 100%;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: .5px;
        outline: none !important;
        width: 80%;

        &:focus {
            border-bottom-color: rgba(255, 255, 255, .4);
        }
    }

    #spotify {
        margin-left: 10px;
    }

    .playlist {
        width: 100%;
        border-radius: 30px 30px 0 0;
        background-color: #E7FFDC;
        width: 100%;
        padding: 40px;
        height: fit-content;


        .song {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 15px;

            .song-img {
                min-width: 50px;
                max-width: 50px;
                min-height: 50px;
                max-height: 50px;
                background-color: black;
                margin: 0 15px 0 0;
            }

            .song-info {
                display: flex;
                flex-direction: column;

                .song-title {
                    font-family: Inter;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 300px;
                    white-space: normal;
                }
            }
        }
    }
}
</style>