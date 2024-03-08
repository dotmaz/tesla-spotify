<template>
    <div class="home">
        <div class="design" id="design-1"></div>
        <div class="design" id="design-2"></div>
        <h1 class="greeting">Good Evening,<br><span class="light">{{ profile.display_name }}</span></h1>
        <h2 class="quote">"Therapy and music, two notes in the same healing melody."</h2>
        <div class="menu">
            <h2>Recent Moods</h2>
            <div class="recent-moods">
                <div class="playlist">
                    <img src="../assets/playlist.png" />
                    <p>Playlist Name</p>
                </div>
                <div class="playlist">
                    <img src="../assets/playlist.png" />
                    <p>Playlist Name</p>
                </div>
                <div class="playlist">
                    <img src="../assets/playlist.png" />
                    <p>Playlist Name</p>
                </div>
            </div>
            <div class="menu-actions">
                <div class="menu-action" @click="goToGallery">
                    <img src="../assets/gallery.png" id="gallery" />
                </div>
                <div class="menu-action" @click="goToEngine">
                    <img src="../assets/engine.png" id="engine" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    components: {
    },
    props: {
        profile: Object,
        goToGallery: Function,
        goToEngine: Function
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
.home {
    background: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    // justify-content: center;
    align-items: center;


    .greeting {
        color: #378F60;
        font-size: 36px;
        font-weight: bold;
        z-index: 1;
        margin: 20px 0;
        font-family: Inter;

        .light {
            font-weight: light;
            font-size: 32px;
            font-family: Inter;
        }
    }

    .quote {
        text-align: center;
        font-weight: bold;
        color: #355734;
        margin: 20px 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, .4);
        z-index: 1;
        max-width: 300px;
        font-family: Inter;
    }

    .recent-moods {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 0 30px;


        .playlist {
            display: flex;
            flex-direction: column;
            justify-content: center;


            img {
                width: 100px;
            }

            p {
                color: white;
                font-size: 12px;
                text-align: center;
                font-family: Inter;
                letter-spacing: 0.5px;
                font-weight: 700;
                margin-top: 5px;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, .4);
            }
        }
    }

    .menu {
        width: 100%;
        height: 300px;
        background: #72A06A;
        border-radius: 40px 40px 0 0;
        position: absolute;
        bottom: 0;
        z-index: 1;

        display: flex;
        flex-direction: column;

        h2 {
            color: white;
            font-weight: bold;
            width: fit-content;
            margin: 20px auto;
            letter-spacing: .75px;
            font-family: Inter;
        }

        .menu-actions {
            margin-top: auto;
            height: 80px;
            width: 100%;
            display: flex;
            flex-direction: row;

            .menu-action {
                width: 50%;
                height: 100%;
                background: #495548;
                border-radius: 40px 40px 0 0;

                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

.design {
    width: 230px;
    height: 200px;
    border-radius: 50%;
    opacity: 0.5;
    position: absolute;
    z-index: 0;
}

#design-1 {
    background-color: #9DBB49;
    top: 100px;
    right: -120px;
}

#design-2 {
    background-color: #74C18E;
    top: 200px;
    left: -140px;
}
</style>