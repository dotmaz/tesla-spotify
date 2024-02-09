<template>
    <div class="recommendation-playlist">
        <h1>Welcome home!</h1>
    </div>
</template>
<script>
// import PrimaryButton from './PrimaryButton.vue';
export default {
    name: 'Home',
    components: {
        // PrimaryButton
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
<style lang="scss">
.recommendation-playlist {
    background: #1B2618;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: scroll;
    padding-top: 50px;
}
</style>