<template>
 <button class="primary-button" @click="handler">
  <slot></slot>
 </button>
</template>

<script>

export default {
  name: 'ButtonPrimary',
  props: {
    handler: Function
  }
}
</script>

<style>
.primary-button{
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #eee;
  background: #eee;
  font-size: 16px;
  cursor: pointer;
  color: #282828;
  font-weight: bold;
}
</style>