<template>
    <div class="recommendation-engine">
        <div class="page" id="mood-page" v-if="page === 0">
            <h1>What are you<br><span class="green">feeling</span><br>today?</h1>
            <p>Pick as many as you want... some days can be complicated</p>
            <div class="mood-options">
                <PrimaryButton v-for="mood in Object.keys(moods)" :isSelected="moods[mood]"
                    :click="() => { moodOptionSelected(mood) }">
                    {{ mood }}
                </PrimaryButton>
            </div>
            <div class="seperator"></div>
            <div class="controls">
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="invisible" />
                <PrimaryButton :isDisabled="true" :click="nextPage" :noMargin="true">I Don't Know</PrimaryButton>
                <font-awesome-icon @click="nextPage()" :icon="['fas', 'arrow-right']" />
            </div>
            <div class="seperator"></div>
            <div class="page-count">
                1/2
            </div>
        </div>
        <div class="page" id="genre-page" v-if="page === 1">
            <h1>What <br><span class="green">genres</span><br> are you looking for?</h1>
            <p>Pick as many as you want... music is so divserse</p>
            <div class="mood-options">
                <PrimaryButton v-for="genre in Object.keys(genres)" :isSelected="genres[genre]"
                    :click="() => { genreOptionSelected(genre) }">
                    {{ genre }}
                </PrimaryButton>
            </div>
            <div class="seperator"></div>
            <div class="controls">
                <font-awesome-icon @click="previousPage()" :icon="['fas', 'arrow-right']" class="flipped" />
                <PrimaryButton :isDisabled="true" :click="generate" :noMargin="true">I Don't Know</PrimaryButton>
                <font-awesome-icon @click="generate" :icon="['fas', 'arrow-right']" />
            </div>
            <div class="seperator"></div>
            <div class="page-count">
                2/2
            </div>
        </div>
    </div>
</template>
<script>
import PrimaryButton from './PrimaryButton.vue';
export default {
    name: 'ReccomendationEngine',
    components: {
        PrimaryButton
    },
    props: {
        generatePlaylist: Function
    },
    data: () => {
        return {
            moods: {
                "Happy": false, "Sad": false, "Peaceful": false, "Anxious": false, "Angry": false, "Grief": false, "Fear": false, "Confusion": false, "Shame": false, "Hope": false, "Excitement": false
            },
            genres: {
                "Pop": false, "Hip-Hop/Rap": false, "Rock": false, "Indie": false, "R&B": false, "EDM": false, "Country": false, "Soul": false, "Ambient": false, "Classical": false, "Jazz": false, "Latin": false
            },
            page: 0
        }
    },
    methods: {
        moodOptionSelected(mood) {
            if (this.moods[mood]) {
                this.moods[mood] = false;
            } else {
                this.moods[mood] = true;
            }
        },
        genreOptionSelected(genre) {
            if (this.genres[genre]) {
                this.genres[genre] = false;
            } else {
                this.genres[genre] = true;
            }
        },
        nextPage() {
            this.page = (this.page + 1) % 2;
        },
        previousPage() {
            this.page = (this.page - 1) < 0 ? 0 : (this.page - 1)
        },
        generate() {
            this.generatePlaylist({
                moods: Object.entries(this.moods).filter(entry => entry[1]).map(entry => entry[0]),
                genres: Object.entries(this.genres).filter(entry => entry[1]).map(entry => entry[0]),
            })
        }
    }
}
</script>
<style lang="scss">
.seperator {
    margin-bottom: 30px;
}

.recommendation-engine {
    background: white;
    width: 100%;

    .controls {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        svg {
            color: black;
            margin: 0 20px;
            font-size: 35px;
        }

        .invisible {
            pointer-events: none;
            visibility: hidden;
        }
    }

    .page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 30px;
    }

    h1 {
        min-width: 100% !important;
        font-size: 50px;
        color: #000;
        font-weight: bold;
        line-height: 60px;

        margin-bottom: 30px;
    }

    p {
        color: #000;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .green {
        color: #7FBE75;
        font-weight: bold;
    }

    .mood-options {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        justify-content: center;
        align-items: center;

        min-width: 420px;
        max-width: 420px;
    }

    .page-count {
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 5px;
    }
}
</style>