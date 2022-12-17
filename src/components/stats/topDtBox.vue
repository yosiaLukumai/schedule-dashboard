<template>
  <q-card
    :class="`bg-${stat.bg} cursor-pointer shadow-3 column q-pl-xl q-py-sm col`"
    style="min-width: 200px; height: 100px"
  >
    <!-- big number  -->
    <div
      :class="`col column justify-center text-${stat.color}`"
      style="font-size: 1.8em"
    >
      {{ stat.app ? stat.app : "" }} {{ stat.value.toLocaleString()
      }}{{ stat.prep ? stat.prep : "" }}
    </div>
    <!-- icon and label goes here -->
    <div :class="`row text-${stat.color} items-center col-4 q-gutter-x-sm`">
      <q-icon :name="stat.icon" :color="stat.color" />
      <div>{{ stat.label }}</div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object,
      default: () => ({
        label: "Todays Visits",
        value: 12000,
        icon: "shopping_cart",
        color: "white",
      }),
    },
  },
};
</script>

<style></style>
