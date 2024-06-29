<script setup lang="ts">
import PlayerList from "@/components/room/sidebar/PlayerList.vue";
import socket from "@/api-sdk/sockets.ts";
import {watch} from "vue";
const props = defineProps(['players', 'roomId']);
const playerId = localStorage.getItem('playerId');
let host = props.players.find(player => player.host);

watch(() => props.players, () => {
  host = props.players.find(player => player.host);
});
const startHandler = () => {
  socket.emit('startGame', { roomId: props.roomId });
};
</script>

<template>
<div class="sidebar">
  <div>
    <PlayerList :players="props.players"/>
  </div>
  <div class="sidebar__host" v-if="host && playerId === host.id">
    <div>Host menu:</div>
    <v-btn @click="startHandler">Рестарт гри</v-btn>
  </div>
</div>
</template>

<style scoped lang="scss">
.sidebar {
  padding: 16px;

  &__host {
    background: lightgrey;
    padding: 16px;
    border-radius: 8px;
    margin-top: 24px;
  }
}
</style>