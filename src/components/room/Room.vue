<script setup lang="ts">
import Game from "@/components/room/game/Game.vue";
import Sidebar from "@/components/room/sidebar/Sidebar.vue";
import {onMounted, onUnmounted, reactive} from "vue";
import {getRoom} from "@/api-sdk/room.ts";
import { useRoute } from 'vue-router'
import socket from "@/api-sdk/sockets.ts";
import {cloneDeep} from "lodash";
import {gameStatuses, GameState} from "@/api-sdk/game.ts";
const route = useRoute();

interface Player {
  id:string;
  name:string;
  online:boolean
  host:boolean
}

const roomId = route.params.id as string;
const playerId = localStorage.getItem('playerId');
const playerName = localStorage.getItem('playerName');

const state = reactive({
  hostId: 0,
  players: [],
  game: {}
});

onMounted(async () => {
  connectPlayer(roomId);
  socket.on('roomJoined', () => updatePlayers(roomId));
  socket.on('gameUpdate', ({ game }) => updateGame(game));
  socket.on('roomLeave', () => {
    updatePlayers(roomId)
  });
  window.addEventListener('beforeunload', handleBeforeUnload);
});

const updateGame = (game:GameState) => {
  if(game?.status === gameStatuses.running && game.players) {
    state.players = state.players.map(player => {
      const playerFound = game.players.find(gamePlayer => {
        if(gamePlayer.id === player.id) {
          return gamePlayer;
        }
      });

      if(playerFound && playerFound.farm) {
        return {
          ...player,
          ...playerFound,
          points: calculatePoint(playerFound.farm)
        };
      }
      return player;
    });
  }
  state.game = cloneDeep(game);
};
// Function to send a message
const connectPlayer = (roomId: string) => {
  socket.emit('joinRoom', { roomId, player: { id: playerId, name: playerName, online: true }});
};

const animalPoints = {
  rabbit: 1,
  sheep: 6,
  pig: 12,
  cow: 36,
  horse: 72,
};

const calculatePoint = (farm) => {
  return (farm.rabbits * animalPoints.rabbit)
      + (farm.sheep * animalPoints.sheep)
      + (farm.pigs * animalPoints.pig)
      + (farm.cows * animalPoints.cow)
      + (farm.horses * animalPoints.horse);
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
      <Game class="room__game" :game="state.game" :room-id="roomId" :host-id="state.hostId" :players="state.players"/>
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
    padding: 16px;
  }
}
</style>