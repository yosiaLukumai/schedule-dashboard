

<template>
  <q-layout view="lHh lpR lfr">
    <q-header elevated class="bg-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat color="primary" round icon="las la-bars" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer  v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="500"
      elevated
      bordered
      class="">
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable style="height: 16px">
            <q-item-section>
              <h6 class="q-pl-xs text-bold text-primary  text-active">
                <q-icon name="las la-university"></q-icon> Smart-board
              </h6>
            </q-item-section>
          </q-item>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable v-ripple :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" color="primary" />
              </q-item-section>
              <q-item-section class="text-primary text-weight-bolder">
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="fas fa-sign-out" color="primary" />
            </q-item-section>
            <q-item-section class="text-primary text-weight-bolder">
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const menuList = [
      {
        icon: "dashboard",
        label: "Dashboard",
        separator: false,
        to: `/auth/dash/`,
      },
      {
        icon: "bento",
        label: "Rooms",
        separator: false,
        to: `/auth/dash/rooms`,
      },
      {
        icon: "living",
        label: "Add Room",
        separator: false,
        to: `/auth/dash/room`,
      },
      {
        icon: "schedule",
        label: "Schedule",
        separator: false,
        to: `/auth/dash/schedule`,
      },
      {
        icon: "fas fa-user",
        label: "Profile",
        separator: false,
        to: `/auth/dash/profile`,
      },
    ];

    return {
      menuList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value 
      }
    }
  }
}
</script>