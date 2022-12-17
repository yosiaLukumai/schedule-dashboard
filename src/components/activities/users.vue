<template>
  <q-card class="my-card bg-secondary q-pa-md">
    <q-item dense>
      <q-item-section avatar>
        <q-icon size="40px" :name="ico" color="orange-10"></q-icon>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-h6 text-deep-orange-14 text-bold">{{
          count
        }}</q-item-label>
        <q-item-label caption>{{ cap }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  props: {
    ico: {
      type: String,
      default: "verified",
    },
    count: {
      type: String,
      default: "3",
    },
    cap: {
      type: String,
      default: "TOTAL MEMBERS",
    },
  },
};
</script>

<style></style>
