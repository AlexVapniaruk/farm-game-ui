<script setup lang="ts">
import StartGame from "@/components/room/game/StartGame.vue";
import {onMounted, reactive} from "vue";
import socket from "@/api-sdk/sockets.ts";
import {gameStatuses} from "@/api-sdk/game.ts";
import GameInProgress from "@/components/room/game/GameInProgress.vue";
import { cloneDeep } from 'lodash';
const props = defineProps(['hostId', 'roomId']);
const playerId = localStorage.getItem('playerId');

const state = reactive({
  game: {}
})
onMounted(async () => {
  socket.on('gameUpdate', ({ game }) => updateGame(game));
});

const updateGame = (game) => {
  state.game = cloneDeep(game);
};
</script>

<template>
<div class="game">
  <StartGame
      v-if="!state.game?.status || state.game?.status === gameStatuses.notStarted"
      :room-id="props.roomId"
      :host="props.hostId === playerId"
  />
  <GameInProgress
      v-else-if="!state.game?.status || state.game?.status === gameStatuses.running"
      :game="state.game"
  />
</div>
</template>

<style scoped lang="scss">
.game {

}
</style>