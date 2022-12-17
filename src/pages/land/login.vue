<template>
  <div class="column q-pt-xl ">
    <div style="" class="row flex-center col-md-8 col-xs-12 col-7">
      <div class="col-md-7 self-center col-12 row flex-center">
        <q-icon color="info" name="security" size="1.5rem"></q-icon>
      </div>
    </div>

    <div class="row q-pt-lg flex-center">
      <div class="col col-md-7 q-px-md">
        <div>
          <q-form class="q-gutter-md" @submit.prevent="submit" ref="form">
            <q-input
              color="info"
              label-color="info"
              v-model="emailValue"
              label="Email"
              clearable
              hint="e.g yosia@mail.com"
              ref="email"
              dark
              :rules="emailRules"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="info" />
              </template>
            </q-input>

            <q-input
              class="q-pt-md"
              color="info"
              label-color="info"
              v-model="passwordValue"
              clearable
              dark
              label="Password"
              type="password"
              hint="*******"
              ref="password"
             
            >
              <template v-slot:prepend>
                <q-icon name="password" color="info" />
              </template>
            </q-input>

            <div class="row q-pt-md">
              <div class="col-5 q-pl-md">
                <q-btn
                  unelevated
                  rounded
                  color="accent"
                  class="bg-info text-bolder"
                  no-caps
                  text-color="dark"
                  label="Login"
                  padding="7px 30px"
                  type="submit"
                />
              </div>
              <div class="col-4 q-pl-sm">
                <q-btn
                  unelevated
                  rounded
                  color="accent"
                  class="bg-info text-bolder"
                  no-caps
                  text-color="dark"
                  label="Recover"
                  to="/recover"
                  padding="7px 30px"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
    <div class="row q-pt-lg flex-center">
      <div class="col col-md-7 q-px-md">
        <div class="row">
          <div class="text-body2 text-info">
            You don't have account?
            <router-link to="/register" style="text-decoration: none; color: white; "> Sign up</router-link>
          </div>
        </div>
      </div>
    </div>
    <div style="" class="q-pt-xl"></div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { notify } from "src/utils/notify";
import { userStore } from "src/stores/users";
import ValidateEmail from "src/utils/validations";
export default {
  setup() {
    const email = ref(null);
    const password = ref(null);
    const passwordValue = ref("");
    const emailValue = ref("");
    const form = ref(null);
    const router = useRouter();
    const userStorage = userStore();
    const emailRules = [
      (val) => (val && val.length > 8) || "Email is required",
      (val) => ValidateEmail(val) || "Enter valid email",
    ];

    // let try setting some of this value

    const submit = async () => {
      const response = await userStorage.login(
        passwordValue.value,
        emailValue.value
      );
      if (response.error) {
        notify("Unable to connect", "info");
      } else {
        // here the server will be on then we can  have the response
        if (response.message == "failure") {
          notify("Data passed not as Json");
        } else if (response.message == "success") {
          // here we check if the password is correct or what
          if (!response.data.authenticated) {
            notify(response.data.data);
          } else {
            // storing the user in the storage
            userStorage.user = response.data;
            userStorage.authenticated = true;
            const id = response.data._id;
            router.push(`auth/dash/${id}/monitor`);
            notify("Logged in");
          }
        }
      }
    };

    return {
      email,
      password,
      emailValue,
      passwordValue,
      submit,
      form,
      emailRules,
    };
  },
};
</script>

<style scoped></style>
