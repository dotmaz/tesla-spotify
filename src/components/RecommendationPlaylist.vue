<template>
    <img src="../assets/close_white.png" class="go-home" @click="goHome" />
    <div class="recommendation-playlist">
        <h1>Here’s your music therapy for the day!</h1>
        <img class="playlist-album" src="../assets/playlist.png" />
        <input v-model="playlistName" type="text" placeholder="Playlist #01" />
        <div class="seperator"></div>
        <div class="actions">
            <PrimaryButton v-if="newPlaylist"
                :click="!loadingCreatePlaylist && (createdPlaylist ? openSpotifyPlaylist : createSpotifyPlaylist)"
                :backgroundColor="`#1DB954`" :borderColor="`transparent`">
                <LoadingSpinner v-if="loadingCreatePlaylist" />
                <div v-else>
                    {{ createdPlaylist ? "Open In Spotify" : "Add To Spotify" }} <img id="spotify"
                        src="../assets/spotify.png" />
                </div>
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
import LoadingSpinner from './LoadingSpinner.vue';
export default {
    name: 'ReccomendationPlaylist',
    components: {
        PrimaryButton,
        LoadingSpinner
    },
    props: {
        initializePlaylists: Function,
        createPlaylist: Function,
        addItemsToPlaylist: Function,
        newPlaylist: Array,
        goHome: Function

    },
    data: () => {
        return {
            playlistName: "",
            createdPlaylist: null,
            loadingCreatePlaylist: false
        }
    },
    methods: {
        async createSpotifyPlaylist() {
            this.loadingCreatePlaylist = true;
            const dateObject = (new Date()).toString().split(' ');
            const dateString = `${dateObject[1]} ${dateObject[2]}, ${dateObject[3]}`
            const createBody = {
                "name": `${this.playlistName}`,
                "description": `Therasonic | ${dateString}`,
                "public": false
            };
            const createdPlaylist = await this.createPlaylist(createBody);

            const updateBody = {
                "uris": this.newPlaylist.map(song => song.uri),
                "position": "0"
            }
            const updateRes = await this.addItemsToPlaylist(createdPlaylist.id, updateBody);

            this.createdPlaylist = createdPlaylist;
            await this.initializePlaylists();
            this.loadingCreatePlaylist = false;
        },
        async openSpotifyPlaylist() {
            window.open(this.createdPlaylist.external_urls.spotify, "_blank");
        }
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
    padding-top: 100px;

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        div {
            display: flex;
            align-items: center;
            height: fit-content;
        }
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

    .playlist-album {
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

                * {
                    color: #333 !important;
                }

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