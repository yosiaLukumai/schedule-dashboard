<template>
  <div class="main-wrapper row items-center justify-center">
    <!--  for menus with no submenus -->
    <q-btn
      :to="to"
      flat
      v-if="!menus.length"
      class="label text-secondary text-bold"
      @click="click"
    >
      {{ label }}
    </q-btn>

    <!-- for menus with submenus -->
    <q-expansion-item
      flat
      dense
      v-else
      class="border-sec-1"
      header-style="height: 50px; min-width: 100px"
      color="secondary"
      :label="label"
      content-class="bg-transparent"
      expand-icon-class="text-secondary"
      :group="group"
    >
      <!--  menu header goes here -->
      <template v-slot:header>
        <q-item-section class="text-bold text-secondary">
          {{ label }}
        </q-item-section>
      </template>
      <!-- submenus -->
      <div class="submenu-wrapper q-px-md">
        <!-- top separator  -->
        <div
          class="submenu-sep-top-wrapper full-width row justify-center items-end"
          style="height: 10px"
        >
          <div class="submenu-top- border-sec-1" style="width: 90%"></div>
        </div>
        <!-- submenu items goes here -->
        <div
          v-for="(menu, index) in menus"
          :key="index"
          class="submenu q-py-md row justify-center"
        >
          <div
            @click="() => routeTo(menu.to)"
            style="text-decoration: none"
            class="text-bold text-secondary"
          >
            {{ menu.label }}
          </div>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { isScroll, pushToID } from "src/utils/router";
import { router } from "src/router";
export default {
  props: {
    border: {
      type: String,
      default: "border-sec-1",
    },
    fontWeight: {
      type: String,
      default: "text-bold",
    },
    iconSpace: {
      type: String,
      default: "sm",
    },
    width: {
      type: String,
    },
    label: {
      type: String,
      default: "PRODUCTS & SERVICES",
    },
    icon: {
      type: String,
      default: "ti-hand-point-down",
    },
    to: {
      type: String,
      default: "#",
    },
    group: {
      type: String,
      default: "default",
    },
    click: {
      type: Function,
      default: () => {},
    },
    menus: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  setup(props) {
    // route the submenu
    const routeTo = (path) => {
      // if not scrollable route
      if (!isScroll(path)) {
        router.push(path);

        props.click();
        return;
      }

      // if to scroll to the given element id
      pushToID(path);
      props.click();
    };

    return { routeTo };
  },
};
</script>

<style scoped>
.main-wrapper {
  width: 100%;
  min-height: 40px;
}
</style>
