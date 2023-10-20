<template>
  <div class="navigation-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style>
.navigation-bar{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #555;

  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}
</style>