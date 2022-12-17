<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            Smart-Board 
            <q-icon name="las la-university"></q-icon>
          </q-toolbar-title>
          <span class="text-bold text-h6 q-pr-xl " @click="$router.push('/')" style="cursor:pointer">login</span>
        </q-toolbar>
      </q-header>
      <q-page-container >
        <router-view />
      <dashFooterVue/>
      </q-page-container>
    </q-layout>
</template>

<script>
import dashFooterVue from "src/components/footer/dashFooter.vue";
import {defineComponent} from "vue"
export default {
  components: {
    dashFooterVue
  },
  setup() {}
}
</script>

<style>

</style>