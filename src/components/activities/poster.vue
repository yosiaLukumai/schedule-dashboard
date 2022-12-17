<template>
  <div class="q-pa-md">
    <q-item clickable :to="`post/${postid}`">
      <q-item-section>
        <q-item-label :class="`${reducerFont} text-bold text-positive`">{{
          title
        }}</q-item-label>
        <q-item-label lines="2" class="text-body2 text-accent">{{
          shortDesc
        }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption class="text-bold text-positive">{{
          timeCreated.slice(0, 10)
        }}</q-item-label>
        <div class="text-dark text-bold">By. {{ author }}</div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { computed } from "vue";
import { max600 } from "src/utils/qmQueries";
export default {
  props: {
    title: {
      type: String,
      default: "Let meet up at 3:00 pm today",
    },
    shortDesc: {
      type: String,
      default:
        "Let catch up at that time so that we can continue our discussion on registers and do some practicals on them, #8 bit computer in action",
    },
    author: {
      type: String,
    },
    category: {
      type: String,
      default: "Information",
    },
    timeCreated: {
      type: String,
      default: "June 2022",
    },
    postid: {
      type: String,
    },
  },
  setup() {
    const reducerFont = computed(() => {
      return max600() ? "text-h6" : "text-body2";
    });

    return { reducerFont };
  },
};
</script>

<style></style>
