<template>
    <div class="spinner"></div>
</template>
<style lang="scss">
.spinner {
    width: 30px !important;
    height: 30px !important;
    border-radius: 50%;
    border: 5px solid rgba(0, 0, 0, .2);
    border-top-color: #333;

    animation: spin .8s ease-in-out infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>