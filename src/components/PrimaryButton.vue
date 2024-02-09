<template>
    <div :class="{ primaryButton: true, selected: isSelected, disabled: isDisabled, noMargin: noMargin }" :style="{
        backgroundColor: backgroundColor, color: textColor, height: small ? '35px' : '45px', borderColor:
            borderColor, padding: small ? '0 100px' : '0 20px'
    }" @click="click">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'PrimaryButton',
    components: {
    },
    props: {
        click: Function,
        isSelected: Boolean,
        isDisabled: Boolean,
        noMargin: Boolean,
        small: Boolean,
        backgroundColor: String,
        textColor: String,
        borderColor: String
    },
    methods: {

    }
}
</script>
<style lang="scss">
.primaryButton {
    padding: 0 20px;
    height: 45px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    border: 4px solid black;
    color: #000;
    font-weight: bold;
    box-shadow: 0 3px 5px 2px rgba(0, 0, 0, .2);
    margin: 0 10px 10px 0;

    user-select: none;
    cursor: pointer;

    transition-duration: 500ms;

    &.selected {
        border-color: white;
        background-color: #7FBE75;
        color: white;
    }

    &.disabled {
        background-color: #D6D6D6;
    }

    &.noMargin {
        margin: 0 !important;
    }
}
</style>