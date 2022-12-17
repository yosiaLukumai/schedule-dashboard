<template>
  <div class="column q-pt-xl">
    <div style="" class="row flex-center col-md-8 col-xs-12 col-7">
      <div class="col-md-7 self-center col-12 row flex-center">
        <q-icon color="info" name="security" size="1.5rem"></q-icon>
      </div>
    </div>

    <div class="row q-pt-lg flex-center">
      <div class="col col-md-7 q-px-md">
        <div>
          <q-form @submit.prevent="submit" ref="form" class="q-gutter-md">
            <q-input
            dark
            color="info"
              label-color="info"
              v-model="emailValue"
              label="Email"
              hint="e.g yosia@mail.com"
              ref="emailElement"
              :rules="emailRules"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="info" />
              </template>
            </q-input>
            <q-input
            dark
            color="info"
              label-color="info"
              v-model="usernameValue"
              ref="usernameElement"
              label="username"
              hint="Yosia_Dev"
              class="q-pt-md"
              :rules="[
                (val) => (val && val.trim().length > 0) || 'Username is required',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="yard" color="info" />
              </template>
            </q-input>
            <q-input
            dark
            color="info"
              label-color="info"
              v-model="phoneValue"
              label="Phone-number"
              hint="0621861605"
              ref="phoneElement"
              :rules="phoneRules"
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="info" />
              </template>
            </q-input>
        
            
         

            <q-input
            dark
              label-color="info"
              v-model="passwordValue"
              ref="passwordElement"
              label="Password"
              color="info"
              type="password"
              hint="*******"
              class="q-pt-md"
              :rules="[
                (val) => val.length >= 5 || 'Please use more than 5 characters',
                (val) => (val && val.length > 0) || 'Password is required',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="password" color="info" />
              </template>
            </q-input>
            <q-input
              label-color="info"
              dark
              v-model="RetypePasswordValue"
              ref="RetypePasswordElement"
              label="Re-type-Password"
              type="password"
              color="info"
              hint="*******"
              class="q-pt-md"
              :rules="rules"
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
                  color="info"
                  class="bg-info text-bolder"
                  no-caps
                  text-color="dark"
                  label="Register"
                  padding="7px 30px"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
    <div class="row q-pt-lg flex-center">
      <div class="col col-md-7 q-px-md">
        <div></div>
      </div>
    </div>

    
    <div class="row q-pt-sm flex-center">
      <div class="col col-md-7 q-px-md">
        <div class="row">
          <div class="text-body2 text-info">
            You have an account? <router-link to="/" style="text-decoration: none; color: white; ">Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { userStore } from "src/stores/users";
import ValidateEmail, { startasTzNo, validateIfNumber } from "src/utils/validations";
import { notify } from "src/utils/notify";
import { useRouter } from "vue-router";
export default {
  setup() {
    const passwordElement = ref(null);
    const passwordValue = ref("");
    const store = userStore();
    const router = useRouter();
    const passwordMatch = (candidatePassword) => {
      if(passwordValue.value == candidatePassword){
        return true
      }
    }

    // function checks if the number is tz one

    const emailElement = ref(null);
    const emailValue = ref("");
    const rules = [
                (val) => val.length >= 5 || 'Please use more than 5 characters',
                (val) => (val && val.length > 0) || 'Password is required',
                (val) => (passwordMatch(val)) || "Password doesn't match"
              ]

    const checkifAllDigits = (val) => {

    }


    const RetypePasswordElement = ref(null);
    const RetypePasswordValue = ref("");
    const usernameElement = ref(null)
    const usernameValue = ref("")
    const phoneElement = ref(null)
    const phoneValue = ref("")
    const phoneRules = [
    (val) => (startasTzNo(val)) || "Enter valid number should start with 07 or 06",
      (val) => (validateIfNumber(val)) || "Enter numbers not characters",
      (val)=> (val.trim().length == 10) || "Enter valid number 10 character",
    ]
    


    const form = ref(null);

    const emailRules = [
      (val) => (val && val.length > 8) || "Email is required",
      (val) => ValidateEmail(val) || "Enter valid email",
    ];

    const submit = async () => {
      const genderToEnter = (genderValue.value == 'Male') ? 1 : 0
      const response = await store.register(
        emailValue.value,
        passwordValue.value,
        genderToEnter,
        usernameValue.value,
        locationValue.value,
        phoneValue.value
      );
      if (response.error) {
        notify("Unable to connect", "warning");
      } else {
        if (response.message == "failure") {
          // here we can yell out for the error
          notify(response.data);
        } else if (response.message == "success") {
          // we can redirect to login
          router.push("/login");
        } else {
          notify(response.data);
        }
      }
    };

    return {
      passwordElement,
      rules,
      emailRules,
      passwordValue,
      submit,
      emailElement,
      emailValue,
      form,
  
      RetypePasswordElement,
      RetypePasswordValue,
      usernameElement,
      usernameValue,
      phoneRules,
      phoneElement,
      phoneValue
    };
  },
};
</script>

<style></style>
