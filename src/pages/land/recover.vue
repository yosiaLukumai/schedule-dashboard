<template>

  <div>

  <div class="column flex-center q-pt-xl">
    <div class="col-md-7 col-md">
      <div class="text-h6 text-info">Enter your Account email</div>
    </div>
  </div>
  <div class="row flex-center q-pt-md">
    <div class="col-md-8 col-12 q-px-md">
      <q-form class="q-gutter-md" @submit="submit">
        <q-input
          color="info"
          dark
          v-model="emailValue"
          label="Email"
          ref="emailElement"
          hint="e.g yosia@mail.com"
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="info" />
          </template>
        </q-input>
        <q-btn
          unelevated
          rounded
          color="info"
          class="bg-info text-bolder"
          no-caps
          text-color="dark"
          label="Recover"
          type="submit"
          padding="7px 30px"
        />
      </q-form>
    </div>
  </div>

  <div style="height: 600" class="q-pt-xl"></div>
  <div style="" class="q-pt-xl"></div>
  <div style="" class="q-pt-xl"></div>
  <div style="" class="q-pt-xl"></div>
  <div style="" class="q-pt-xl"></div>
</div>

</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const emailElement = ref(null);
    const emailValue = ref("");
    const submit = () => {};
    return {
      emailElement,
      emailValue,
      submit,
    };
  },
};
</script>

<style></style>
