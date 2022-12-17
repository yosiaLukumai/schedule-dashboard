<template>
  <q-header
    class="text-primary blur bb-grey row justify-end"
    style="height: 60px"
  >
    <!-- menu for larger devices -->
    <q-tabs active-class="text-secondary" shrink stretch dense mobile-arrows>
      <q-route-tab
        v-for="(menu, index) in menus"
        :to="menu.to"
        :key="index"
        :label="menu.label"
        :icon="menu.icon"
        no-caps
        exact
      />
    </q-tabs>
  </q-header>
</template>

<script>
const menus = [
  {
    to: "/",
    icon: "home",
    label: "Home",
  },
  {
    label: "Pricing",
    to: "/pricing",
    icon: "credit_card",
  },
  {
    label: "Contact",
    to: "/contact",
    icon: "phone",
  },
  {
    label: "About",
    to: "/about",
    icon: "help_outline",
  },
];

export default {
  components: {},
  setup() {
    return { menus };
  },
};
</script>

<style></style>
