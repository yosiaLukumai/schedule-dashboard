<template>
  <!---Adding the footer for the large devices-->
  <div class="column q-pt-xl items-center q-pb-md q-gutter-y-sm">
    <div
      class="row no-wrap justify-between full-width"
      style="max-width: 600px"
    >
      <vlink
        class="text-subtitle1 text-primary text-weight-light cursor-pointer"
        v-for="(link, index) in landMenus"
        :key="index"
        :label="link.label"
        :to="link.to"
        color="primary"
      />
    </div>
    <!--Icons goes here-->
    <div class="row flex-center">
      <q-btn
        @click="() => goOut(account.to)"
        v-for="account in socialMediaAccounts"
        :key="account.to"
        :icon="account.icon"
        dense
        flat
        round
        size="1.2em"
        color="primary"
      >
        <q-tooltip v-if="!$br.max1000">
          {{ account.label }}
        </q-tooltip>
      </q-btn>
    </div>

    <!-- footer credits -->
    <div
      class="text-primary text-subtitle1 text-weight-light text-center"
      style="font-size: 1.1em"
    >
      Copyright &copy; {{ currentYear }} InStore by
      <span
        class="cursor-pointer"
        @click="() => goOut('https://www.axismedium.com')"
        >Axis Medium</span
      >
    </div>
  </div>
</template>

<script>
import { goOut } from "src/utils/router";
import { useAppStore } from "src/stores/appStore";
import { year } from "src/utils/date";
import vlink from "src/components/buttons/vlink.vue";
import { computed } from "vue";
export default {
  components: { vlink },

  setup() {
    const { landMenus, socialMediaAccounts } = useAppStore();

    const currentYear = computed(() => year());

    return { goOut, landMenus, currentYear, socialMediaAccounts };
  },
};
</script>

<style scoped></style>
