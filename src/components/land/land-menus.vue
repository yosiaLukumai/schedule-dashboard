<template>
  <div
    class="text-primary items-center text-bold fit"
    style="overflow-x: hidden"
  >
    <!-- scroll area -->
    <q-list separator class="q-pt-xl">
      <div v-for="(menu, index) in landMenus" :key="index">
        <!--if no chdren -->
        <q-item @click="click" v-if="!menu.menus" clickable :to="menu.to">
          <q-item-section avatar>
            <q-avatar
              color="transparent"
              text-color="primary"
              :icon="menu.icon"
            />
          </q-item-section>
          <q-item-section class="relative">
            <q-item-label header class="text-primary relative">
              {{ menu.label }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- if there are children -->
        <q-expansion-item
          group="land-menu"
          v-else
          expand-icon-class="text-primary"
        >
          <!-- header slot goes here -->
          <template v-slot:header>
            <q-item-section top avatar>
              <q-avatar
                color="transparent"
                text-color="primary"
                :icon="menu.icon"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label header class="text-primary">
                {{ menu.label }}
              </q-item-label>
            </q-item-section>
          </template>
          <!-- chldren goes here -->
          <q-card class="border q-ml-md">
            <q-item
              @click="click"
              v-for="(chdmenu, chIndex) in menu.menus"
              :to="chdmenu.to"
              :key="chIndex"
              clickable
            >
              <q-item-section avatar>
                <q-avatar
                  color="transparent"
                  text-color="secondary"
                  :icon="chdmenu.icon"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-secondary">
                  {{ chdmenu.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </q-expansion-item>
      </div>
    </q-list>

    <!-- login button goes here  -->
    <div
      class="bg-grey-5"
      style="height: 1px; width: 90%; margin: 100px auto 0 auto"
    ></div>
    <q-item clickable to="/login" @click="click">
      <q-item-section avatar>
        <q-avatar color="transparent" text-color="primary" icon="login" />
      </q-item-section>
      <q-item-section class="relative">
        <q-item-label header class="text-primary relative">
          Sign In
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { useAppStore } from "src/stores/appStore";
export default {
  props: {
    click: {
      type: Function,
      default: () => {},
    },
  },
  components: {},
  setup() {
    const { logout, landMenus } = useAppStore();

    return { logout, landMenus };
  },
};
</script>

<style scoped>
.show-line {
  width: 100%;
}

.hide-line {
  width: 0%;
}
</style>
