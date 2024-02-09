<template>
    <div class="loading-screen">
        <div v-for="segment in segments" :class="{ segment: true, filled: segment }">
        </div>
    </div>
</template>
<script>
// import PrimaryButton from './PrimaryButton.vue';
export default {
    name: 'LoadingScreen',
    components: {
        // PrimaryButton
    },
    props: {
        finishGeneratePlaylist: Function
    },
    data: () => {
        return {
            segments: new Array(7).fill(false),
            count: 0
        }
    },
    methods: {
        updateSegments() {
            if (this.count >= this.segments.length) {
                this.finishGeneratePlaylist();
                return
            }
            this.segments[this.count] = true
            this.count++
            setTimeout(this.updateSegments, 200);
        }
    },
    mounted() {
        this.updateSegments();
    }
}
</script>
<style lang="scss">
.loading-screen {
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 50px;

    .segment {
        width: 25px;
        height: 60px;
        background: #BECE9D;
        margin: 0 10px;
        box-shadow: 0 5px 6px 0 rgba(0, 0, 0, .3);
        transition-duration: 200ms;
        border-radius: 3px;

        &.filled {
            background-color: #74D825;
        }
    }
}
</style>