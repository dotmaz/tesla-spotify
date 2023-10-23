<template>
  <div class="profile-card">
    <div class="profile-text">
      <p class="name">{{ profile.display_name }}</p>
      <p class="email">{{ profile.email }}</p>
    </div>

    <img class="picture" :src="profile.images?.[profile.images.length - 1].url" />
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    profile: Object
  }
}
</script>

<style lang="scss">
.profile-card {
  width: fit-content;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;

  .name,
  .email {
    margin: 2px 0px;
    text-align: right;
  }

  .name {
    font-weight: bold;
    font-size: 20px;
  }

  .email {
    font-size: 12px;
    color: #999;
    font-weight: 400;
  }

  .picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
  }
}

.profile-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
