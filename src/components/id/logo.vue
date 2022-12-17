<template>
  <div @click="$router.push('/')" class="cursor-pointer">
    <span class="text-secondary text-weight-bold" :style="`${textSize}`"
      >Robomus</span
    >
  </div>
</template>

<script>
import { max700 } from "src/utils/qmQueries";
import { computed } from "vue";
export default {
  setup() {
    const textSize = computed(() => {
      return max700() ? "font-size: 1.3rem" : "font-size: 1.1rem";
    });
    return { textSize };
  },
};
</script>

<style></style>
