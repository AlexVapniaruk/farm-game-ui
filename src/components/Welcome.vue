<script setup lang="ts">

import CreateRoom from "@/components/create-room/CreateRoom.vue";
</script>

<template>
<div class="welcome">
  <div>
    Для початку гри створіть кімнату і пошарьте друзям посилання:
  </div>
  <CreateRoom/>
</div>
</template>

<style lang="scss" scoped>
.welcome {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 20vh auto;
  padding: 16px;
  background: rgba(211, 211, 211, 0.90);
  border-radius: 8px;
  height: 100vh;
}
</style>