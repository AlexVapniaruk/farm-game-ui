<script setup lang="ts">
const props = defineProps(['player']);
</script>

<template>
<div>
  <div class="animal-list">
    <div v-if="props.player.farm.dogLevel1" class="dog">
      <img src="@/assets/img/doglevel1.png"/>
    </div>
    <div class="animal-count" v-if="props.player.farm.rabbits > 5">{{ props.player.farm.rabbits }}</div>
    <div v-for="n in 5" class="animal">
      <img v-if="n <= props.player.farm.rabbits" src="@/assets/img/rabbit.png" class="animal rabbit no-filter"/>
      <div v-else class="animal rabbit hue-filter"/>
    </div>
  </div>
  <div class="animal-list">
    <div v-if="props.player.farm.dogLevel2" class="dog">
      <img src="@/assets/img/doglevel2.png"/>
    </div>
    <div class="animal-count" v-if="props.player.farm.sheep > 4">{{ props.player.farm.sheep }}</div>
    <div v-for="n in 4" class="animal">
      <img v-if="n <= props.player.farm.sheep" src="@/assets/img/sheep.png" class="animal sheep no-filter"/>
      <div v-else class="animal sheep hue-filter"/>
    </div>
  </div>
  <div class="animal-list">
    <div class="animal-count" v-if="props.player.farm.pigs > 3">{{ props.player.farm.pigs }}</div>
    <div v-for="n in 3" class="animal">
      <img v-if="n <= props.player.farm.pigs" src="@/assets/img/pig.png" class="animal pig no-filter"/>
      <div v-else class="animal pig hue-filter"/>
    </div>
  </div>
  <div class="animal-list">
    <div class="animal-count" v-if="props.player.farm.cows > 2">{{ props.player.farm.cows }}</div>
    <div v-for="n in 2" class="animal">
      <img v-if="n <= props.player.farm.cows" src="@/assets/img/cow.png" class="animal cow no-filter"/>
      <div v-else class="animal cow hue-filter"/>
    </div>
  </div>
  <div class="animal-list">
    <div class="animal-count" v-if="props.player.farm.horses > 1">{{ props.player.farm.horses }}</div>
    <div v-for="n in 1" class="animal">
      <img v-if="n <= props.player.farm.horses" src="@/assets/img/horse.png" class="animal horse no-filter"/>
      <div v-else class="animal horse hue-filter"/>
    </div>
  </div>
  <div class="animal-list">
    <div v-if="props.player.dogLevel1" class="dog-level-1">
      dog 1
    </div>
    <div v-if="props.player.dogLevel2" class="dog-level-2">
      dog 2
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.animal {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;

  img {
    filter: none !important;
  }
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

.animal-list {
  display: flex;
  justify-content: center;
  gap: 16px;
  position: relative;
}

.dog {
  position: absolute;
  right: -120px;

  & img {
    width: 125px;
    height: 125px;
  }
}

.hue-filter {
  filter: grayscale(90%) hue-rotate(30deg);
}

.no-filter {
  filter: none !important;
  position: relative;
  z-index: 1;
}
</style>