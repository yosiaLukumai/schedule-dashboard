<template>
  <div class="q-py-md">
    <q-toolbar>
      <logo />
      <q-space />
      <q-btn
        style="font-size: 1rem"
        icon-right="las la-arrow-right"
        label="Login"
        color="secondary"
        dense
        :padding="textSize"
        outline
        no-caps
        rounded
        @click="$router.replace(checkLoggedin())"
      ></q-btn>
    </q-toolbar>
  </div>
</template>

<script>
import logo from "src/components/id/logo.vue";
import { userStore } from "src/stores/users";
import { computed } from "vue";
import { max700 } from "src/utils/qmQueries";
export default {
  components: {
    logo,
  },
  setup() {
    const userS = userStore();
    const textSize = computed(() => {
      return max700() ? "3px 39px" : "3px 15px";
    });
    const landMenu = [
      {
        label: "login",
        to: "/login",
        icon: "fa-solid fa-tags",
      },
    ];

    const checkLoggedin = () => {
      return userS.authenticated && userS.user
        ?{path:  `/auth/dash/${userS.user._id}` }
        : {path: "/login"};
    };

    return { landMenu, textSize, userS, checkLoggedin };
  },
};
</script>

<style></style>
