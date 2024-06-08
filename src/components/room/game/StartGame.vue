<script setup lang="ts">
import socket from "@/api-sdk/sockets.ts";

const props = defineProps(['host', 'roomId']);

const startHandler = () => {
  console.log('startHandler');
  socket.emit('startGame', { roomId: props.roomId });
};
</script>

<template>
  <div class="start-game">
    <div v-if="props.host">
      <v-btn color="secondary" @click="startHandler">Почати гру</v-btn>
    </div>
    <div v-else>
      Чекаємо... хост розпочне гру
    </div>
  </div>
</template>

<style scoped lang="scss">
.start-game {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 20vh auto;
  padding: 16px;
  background: rgba(211, 211, 211, 0.90);
  border-radius: 8px;
}
</style>