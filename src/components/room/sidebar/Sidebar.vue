<script setup lang="ts">
import PlayerList from "@/components/room/sidebar/PlayerList.vue";

const props = defineProps(['players']);

</script>

<template>
<div>
  <div>
    Game:
    <div>Score: 1</div>
  </div>

  <div>
    <PlayerList :players="props.players"/>
  </div>
</div>
</template>

<style scoped>

</style>