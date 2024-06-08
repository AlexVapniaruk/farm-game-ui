<script setup lang="ts">
import Game from "@/components/room/game/Game.vue";
import Sidebar from "@/components/room/sidebar/Sidebar.vue";
import {onMounted, onUnmounted, reactive} from "vue";
import {getRoom} from "@/api-sdk/room.ts";
import { useRoute } from 'vue-router'
import socket from "@/api-sdk/sockets.ts";
const route = useRoute();

interface Player {
  id:string;
  name:string;
  online:boolean
  host:boolean
}

const roomId = route.params.id;
const playerId = localStorage.getItem('playerId');
const playerName = localStorage.getItem('playerName');

const state = reactive({
  hostId: 0,
  players: [],
});

onMounted(async () => {
  connectPlayer(roomId);
  socket.on('roomJoined', () => updatePlayers(roomId));
  socket.on('roomLeave', () => {
    updatePlayers(roomId)
  });
  window.addEventListener('beforeunload', handleBeforeUnload);
});

// Function to send a message
const connectPlayer = (roomId: string) => {
  socket.emit('joinRoom', { roomId, player: { id: playerId, name: playerName, online: true }});
};

const updatePlayers = async (roomId:string) => {
  let { data } = await getRoom(roomId);
  data.players.map((player:Player) => {
    if(player.id === data.hostId) {
      state.hostId = data.hostId;
      player.host = true;
    }
    return player;
  })
  state.players = data.players;
};

onUnmounted(() => {
  socket.off('disconnect', { playerId, playerName, online: false });
});

const handleBeforeUnload = () => {
  console.log('Tab is closing, notifying server...');
  socket.emit('playerOffline', { roomId, playerId });
};
</script>

<template>
  <div class="room">
    <div class="room__content">
      <Sidebar class="room__sidebar" :players="state.players"/>
      <Game class="room__game" :room-id="roomId" :host-id="state.hostId" :players="state.players"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.room {
  background: url("@/assets/img/wood.jpg");
  background-size: contain;
  padding: 16px;
  height: 100vh;

  &__content {
    display: flex;
  }

  &__sidebar {
    width: 260px;
    height: 100%;
  }

  &__game {
    flex-grow: 1;
  }
}
</style>