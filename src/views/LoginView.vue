<template>
  <div  class="login-container">
    <ButtonPrimary :handler="() => {
      this.initializeFullscreen();
      login(true)
    }
      ">Login</ButtonPrimary>
  </div>
</template>
<script>
import ButtonPrimary from '../components/ButtonPrimary.vue';
export default {
    components: {
        ButtonPrimary
    },
    props: {
        initializeFullscreen: Function,
        login: Function
    }
}
</script>