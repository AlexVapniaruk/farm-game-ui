<script setup lang="ts">
import Farm from "@/components/room/game/Farm.vue";
import socket from "@/api-sdk/sockets.ts";
import {onMounted, reactive, watch} from "vue";
import {GamePlayer} from "@/api-sdk/game.ts";
import rabbitImage from '@/assets/img/cube/rabbit.png';
import sheepImage from '@/assets/img/cube/sheep.png';
import pigImage from '@/assets/img/cube/pig.png';
import cowImage from '@/assets/img/cube/cow.png';
import horseImage from '@/assets/img/cube/horse.png';
import foxImage from '@/assets/img/cube/fox.png';
import wolfImage from '@/assets/img/cube/wolf.png';

const props = defineProps(['game']);
const playerId = localStorage.getItem('playerId');
let playing = props.game.players.find((player:GamePlayer) => player.id === props.game.playingId);
let winner = props.game.players.find((player:GamePlayer) => player.id === props.game.winnerId);

const state = reactive({
  isRotating: false
})

watch(() => props.game, () => {
  playing = props.game.players.find((player:GamePlayer) => player.id === props.game.playingId)
  winner = props.game.players.find((player:GamePlayer) => player.id === props.game.winnerId)
});

enum animals {
  rabbit,
  sheep,
  pig,
  cow,
  horse,
  dogLevel1,
  dogLevel2,
  fox,
  wolf
}

const redCubeList = [
  rabbitImage, sheepImage, pigImage, 0, horseImage, 0, 0, foxImage, 0
];

const blueCubeList = [
  rabbitImage, sheepImage, pigImage, cowImage, 0, 0, 0, 0, wolfImage
];

onMounted(async () => {
  socket.on('playCubesAnimation', () => startRotation());
});

const startRotation = () => {
  state.isRotating = true;
  setTimeout(() => {
    state.isRotating = false;
  }, 2000); // 2 seconds
};

const playCubes = () => {
  startRotation();
  socket.emit('playCubes', {})
};

const buyAnimal = (animalKey:number) => {
  socket.emit('buyAnimal', { animalKey })
};

const endMove = () => {
  socket.emit('endMove', {})
};
</script>

<template>
<div class="game-in-progress">
  <div>
  <div class="player-move">
    <div v-if="!game.winnerId">
      <div v-if="playing.id !== playerId">Виконує хід: {{ playing.name }}</div>
      <div v-else>Ваш хід</div>
    </div>
    <div v-else>
      Переміг {{ winner.name}}!!!
    </div>
  </div>
  <div class="cubes">
    <div>
      <div class="cubes-list">
        <img style="display: none" width="60" height="60" src="@/assets/img/cube/rabbit.png"/>
        <img style="display: none"  width="60" height="60" src="@/assets/img/cube/fox.png"/>
        <img style="display: none"  width="60" height="60" src="@/assets/img/cube/horse.png"/>
        <img style="display: none"  width="60" height="60" src="@/assets/img/cube/pig.png"/>
        <img style="display: none"  width="60" height="60" src="@/assets/img/cube/cow.png"/>
        <img style="display: none"  width="60" height="60" src="@/assets/img/cube/wolf.png"/>
        <img style="display: none"  width="60" height="60" src="@/assets/img/cube/sheep.png"/>
        <div class="cube red-cube rotatable" :class="{ 'rotate': state.isRotating }">
          <img width="60" height="60" :src="`${redCubeList[props.game.redCubeNumber]}`"/>
        </div>
        <div class="cube blue-cube rotatable" :class="{ 'rotate': state.isRotating }">
          <img width="60" height="60" :src="`${blueCubeList[props.game.blueCubeNumber]}`"/>
        </div>
      </div>
      <div v-if="!winner && playing.id === playerId" class="controls">
        <div class="buttons-list">
          <v-btn
              class="drop-cubes-button"
              color="secondary"
              :disabled="props.game.cubesPlayed"
              @click="playCubes"
          >
            Кинути кубики
          </v-btn>
          <v-btn
              :disabled="playing.farm.dogLevel1 || game.dogLevel1bought === 4 || playing.farm.sheep === 0"
              @click="() => buyAnimal(animals.dogLevel1)"
          >
            Купити дворнягу
          </v-btn>
          <v-btn
              :disabled="playing.farm.dogLevel2 || game.dogLevel2bought === 2 || playing.farm.cows === 0"
              @click="() => buyAnimal(animals.dogLevel2)"
          >
            Купити вовкодава
          </v-btn>
          <v-btn
              :disabled="!game.exchangeMade && playing.farm.rabbits < 6"
              @click="() => buyAnimal(animals.sheep)"
          >
            Купити вівцю
          </v-btn>
          <v-btn
              :disabled="!game.exchangeMade && playing.farm.sheep < 2"
              @click="() => buyAnimal(animals.pig)"
          >
            Купити свиню
          </v-btn>
          <v-btn
              :disabled="!game.exchangeMade && playing.farm.pigs < 3"
              @click="() => buyAnimal(animals.cow)"
          >
            Купити корову
          </v-btn>
          <v-btn
              :disabled="!game.exchangeMade && playing.farm.cows < 2"
              @click="() => buyAnimal(animals.horse)"
          >
            Купити коня
          </v-btn>
          <v-btn
              color="error"
              :disabled="!props.game.cubesPlayed"
              @click="() => endMove()"
          >
            Завершити хід
          </v-btn>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="animal-board">
    <div class="exchange">
      <div class="exchange-row">
        <div>6</div>
        <div>
        <img src="@/assets/img/rabbit.png">
        </div>
        <div>
          =
        </div>
        <div>1</div>
        <div>
          <img src="@/assets/img/sheep.png">
        </div>
      </div>
      <div class="exchange-row">
        <div>2</div>
        <div>
          <img src="@/assets/img/sheep.png">
        </div>
        <div>
          =
        </div>
        <div>1</div>
        <div>
          <img src="@/assets/img/pig.png">
        </div>
      </div>
      <div class="exchange-row">
        <div>3</div>
        <div>
          <img src="@/assets/img/pig.png">
        </div>
        <div>
          =
        </div>
        <div>1</div>
        <div>
          <img src="@/assets/img/cow.png">
        </div>
      </div>
      <div class="exchange-row">
        <div>2</div>
        <div>
          <img src="@/assets/img/cow.png">
        </div>
        <div>
          =
        </div>
        <div>1</div>
        <div>
          <img src="@/assets/img/horse.png">
        </div>
      </div>
    </div>
    <div class="exchange exchange-dog">
      <div class="exchange-row">
        <div>1</div>
        <div>
          <img src="@/assets/img/sheep.png">
        </div>
        <div>
          =
        </div>
        <div>1</div>
        <div>
          <img src="@/assets/img/doglevel1.png">
        </div>
      </div>
      <div class="exchange-row">
        <div>1</div>
        <div>
          <img src="@/assets/img/cow.png">
        </div>
        <div>
          =
        </div>
        <div>1</div>
        <div>
          <img src="@/assets/img/doglevel2.png">
        </div>
      </div>
    </div>
    <Farm :player="playing"/>
  </div>
</div>
</template>

<style scoped lang="scss">
.game-in-progress {
  display: flex;
}

.player-move {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: lightgoldenrodyellow;
  border-radius: 8px;
  width: 350px;
  margin: 0 auto 20px;
}

.animal-board {
  flex-grow: 1;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.exchange {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 40px;
  background: lightgray;
  padding: 8px;
  border-radius: 8px;
}

.exchange-dog {
  right: 0;
  left: auto;
}

.exchange-row {
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 50px;
    height: 50px;
  }

  div {
    display: flex;
    align-items: center;
  }
}

.cubes {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}

.cubes-list {
  display: flex;
  justify-content: center;
}

.drop-cubes-button {
  margin-bottom: 30px;
}
.cube {
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center center;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.red-cube {
  background: url('@/assets/img/red-cube.png');
}

.blue-cube {
  background: url('@/assets/img/blue-cube.png');
}

.buttons-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.rotate {
  animation: shakeRotate 2s linear;
  filter: blur(3px);

  & img {
    filter: blur(10px);
  }
}

@keyframes shakeRotate {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
  10%, 90% {
    transform: rotate(108deg) translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: rotate(216deg) translate3d(2px, 0, 0);
  }
  30%, 70% {
    transform: rotate(324deg) translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: rotate(432deg) translate3d(4px, 0, 0);
  }
  50% {
    transform: rotate(540deg) translate3d(0, 0, 0);
  }
  100% {
    transform: rotate(1080deg) translate3d(0, 0, 0);
  }
}
</style>