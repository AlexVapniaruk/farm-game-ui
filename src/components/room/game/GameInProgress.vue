<script setup lang="ts">
import socket from "@/api-sdk/sockets.ts";
import {reactive, watch} from "vue";

const props = defineProps(['game']);
const playerId = localStorage.getItem('playerId');
let playing = props.game.players.find(player => player.id === props.game.playingId);

const state = reactive({
  isRotating: false
})

watch(() => props.game, () => {
  playing = props.game.players.find(player => player.id === props.game.playingId)
});

enum animals {
  rabbit,
  sheep,
  pig,
  cow,
  horse,
  dogLevel1,
  dogLevel2
};

const redCubeList = [
  'rabbit', 'sheep', 'pig', 'horse', 'fox'
];

const blueCubeList = [
  'rabbit', 'sheep', 'pig', 'cow', 'wolf'
];

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

const buyAnimal = (animalKey) => {
  socket.emit('buyAnimal', { animalKey })
};
</script>

<template>
<div>
  <div class="player-move">
    <div v-if="playing.id !== playerId">Виконує хід: {{ playing.name }}</div>
    <div v-else>Ваш хід</div>
  </div>
  <div class="cubes">
    <div>
      <div class="cubes-list">
        <div class="cube red-cube rotatable" :class="{ 'rotate': state.isRotating }">
          <img width="60" height="60" :src="`/src/assets/img/cube/${redCubeList[props.game.redCubeNumber]}.png`"/>
        </div>
        <div class="cube blue-cube rotatable" :class="{ 'rotate': state.isRotating }">
          <img width="60" height="60" :src="`/src/assets/img/cube/${blueCubeList[props.game.blueCubeNumber]}.png`"/>
        </div>
      </div>
      <div v-if="playing.id === playerId" class="controls">
        <div class="buttons-list">
          <v-btn
              color="secondary"
              :disabled="props.game.cubesPlayed"
              @click="playCubes"
          >
            Кинути кубіки
          </v-btn>
          <v-btn
              :disabled="playing.farm.sheep === 0"
              @click="() => buyAnimal(animals.dogLevel1)"
          >
            Купити дворнягу
          </v-btn>
          <v-btn
              :disabled="playing.farm.cows === 0"
              @click="() => buyAnimal(animals.dogLevel2)"
          >
            Купити вовкодава
          </v-btn>
          <v-btn color="error" :disabled="props.game.cubesPlayed">Завершити хід</v-btn>
        </div>
        <div class="buttons-list">
          <v-btn
              :disabled="playing.farm.rabbits < 6"
              @click="() => buyAnimal(animals.sheep)"
          >
            Купити вівцю
          </v-btn>
          <v-btn
              :disabled="playing.farm.sheep < 2"
              @click="() => buyAnimal(animals.pig)"
          >
            Купити свиню
          </v-btn>
          <v-btn
              :disabled="playing.farm.pigs < 3"
              @click="() => buyAnimal(animals.cow)"
          >
            Купити корову
          </v-btn>
          <v-btn
              :disabled="playing.farm.cows < 2"
              @click="() => buyAnimal(animals.horse)"
          >
            Купити коня
          </v-btn>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="animal-list">
      <div class="animal-count" v-if="playing.farm.rabbits > 5">{{ playing.farm.rabbits }}</div>
      <div v-for="n in 5" class="animal">
        <img v-if="n <= playing.farm.rabbits" src="@/assets/img/rabbit.png" class="animal rabbit no-filter"/>
        <div v-else class="animal rabbit hue-filter"/>
      </div>
    </div>
    <div class="animal-list">
      <div v-for="n in 4" class="animal">
        <img v-if="n <= playing.farm.sheep" src="@/assets/img/sheep.png" class="animal sheep no-filter"/>
        <div v-else class="animal sheep hue-filter"/>
      </div>
    </div>
    <div class="animal-list">
      <div v-for="n in 3" class="animal">
        <img v-if="n <= playing.farm.pigs" src="@/assets/img/pig.png" class="animal pig no-filter"/>
        <div v-else class="animal pig hue-filter"/>
      </div>
    </div>
    <div class="animal-list">
      <div v-for="n in 2" class="animal">
        <img v-if="n <= playing.farm.cows" src="@/assets/img/cow.png" class="animal cow no-filter"/>
        <div v-else class="animal cow hue-filter"/>
      </div>
    </div>
    <div class="animal-list">
      <div v-for="n in 1" class="animal">
        <img v-if="n <= playing.farm.horses" src="@/assets/img/horse.png" class="animal horse no-filter"/>
        <div v-else class="animal horse hue-filter"/>
      </div>
    </div>
    <div class="animal-list">
      <div v-if="playing.dogLevel1" class="dog-level-1">
        dog 1
      </div>
      <div v-if="playing.dogLevel2" class="dog-level-2">
        dog 2
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.player-move {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}

.animal-list {
  display: flex;
  justify-content: center;
  gap: 16px;
  position: relative;
}

.cubes {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}

.animal {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;

  img {
    filter: none !important;
  }
}

.cubes-list {
  display: flex;
  justify-content: center;
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

.hue-filter {
  filter: grayscale(90%) hue-rotate(30deg);
}

.no-filter {
  filter: none !important;
  position: relative;
  z-index: 1;
}

.rabbit {
  background-image: url('@/assets/img/rabbit.png');
}
.sheep {
  background-image: url('@/assets/img/sheep.png');
}
.pig {
  background-image: url('@/assets/img/pig.png');
}
.cow {
  background-image: url('@/assets/img/cow.png');
}
.horse {
  background-image: url('@/assets/img/horse.png');
}

.buttons-list {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.animal-count {
  position: absolute;
  top: 0;
  color: red;
  font-weight: 500;
  font-size: 26px;
  z-index: 10;
  background: white;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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