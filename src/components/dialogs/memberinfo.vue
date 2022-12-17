<template>
  <div>
    <q-dialog
      v-model="bn"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: "13243245",
          username: "@yosia",
          email: "yosia@mail.com",
          emailVerifed: true,
        };
      },
      toggle: {
        type: Boolean,
        default: false,
      },
    },
  },
  setup(props) {
    const model = ref(props.toggle);
    const bn = computed(()=> {
        return props.toggle
    })

    watch(model, (prev, curr)=> {
        console.log(prev, curr)
    })
    return { model, bn };
  },
};
</script>

<style></style>
