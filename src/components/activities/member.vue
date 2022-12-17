<template>
  <div class="">
    <q-card
      :class="`my-card  ${removepad}`"
      bordered
      style="border-radius: 10px"
    >
      <q-card-section>
        <q-item dense>
          <q-item-section avatar>
            <q-avatar
              :color="`${bg} text-bold`"
              :text-color="`${bg == 'dark' ? 'white' : 'primary'}`"
              >{{ member?.username?.slice(0, 1).toUpperCase() }}</q-avatar
            >
          </q-item-section>
          <q-item-section no-wrap>
            <q-item-label :class="`text-bold text-accent ${textSize}`">
              {{ member?.email }}
            </q-item-label>
            <q-item-label caption class="text-orange-10 text-bold">
              {{ member?.username }}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar style="cursor: pointer">
            <q-icon
              name="ti-more"
              color="orange-10"
              @click="toggleModel = !toggleModel"
              :size="iconSize"
            ></q-icon>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
  <!-- <memberinfoVue :toggle="toggleModel" /> -->
  <q-dialog
    v-model="toggleModel"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card class="my-card q-pa-md" bordered style="width: 700px; max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-bold text-dark">More info</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-h6 text-bold text-dark">Basic Information</div>
        <div class="row q-pt-sm">
          <div class="col-md-6 col-12">
            <div class="text-dark text-body2">Email</div>
            <div class="text-caption text-orange-10">{{ member?.email }}</div>
          </div>
          <div class="col-md-6 col-12">
            <div class="text-dark text-body2">Username</div>
            <div class="text-caption text-orange-10">
              {{ memberProp?.username }}
            </div>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-md-6 col-12">
            <div class="text-dark text-body2">Phone number</div>
            <div class="text-caption text-orange-10">
              {{ memberProp?.phonenumber }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div v-if="users?.user?.superAdmin">
          <div class="text-h6 text-dark text-bold">Account Authentication</div>
          <div class="row q-pt-md">
            <div class="col-md-4 col-4 text-dark text-body2">Email</div>
            <div class="col-md-4 col-4 text-body2 text-accent text-bold">
              {{ memberProp?.emailVerified ? "Verified" : "Un-Verified" }}
            </div>
          </div>
          <div class="row q-pt-sm">
            <div class="col-md-4 col-sm-3 col-4 text-dark text-body2">
              Account
            </div>
            <div
              class="col-md-4 col-sm-4 col-5 text-body2 text-accent text-bold"
            >
              {{ memberProp?.authenticated ? "authenticated" : "un-authenticated" }}
            </div>
            <div
              v-if="!memberProp?.authenticated"
              class="col-md-4 col-sm-4 col-12 text-dark text-body2 text-accent text-bold text-orange-10"
            >
              <span
                @click="authenticateModel = !authenticateModel"
                style="cursor: pointer"
              >
                authenticate
              </span>
            </div>
          </div>
          <div class="q-pt-md" v-if="users?.user?.email != memberProp?.email">
            <div class="text-negative text-bold text-h6">Danger zone</div>
            <q-btn
              label="Delete Acc"
              no-caps
              color="negative"
              @click="secondDialog = !secondDialog"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="text-white" style="width: 300px">
        <q-card-section>
          <div class="text-body1 text-dark">
            Are you sure you want to delete this User
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-negative">
          <q-btn
            label="Cancel"
            no-caps
            flat
            text-color="dark"
            v-close-popup
          ></q-btn>
          <q-btn flat label="Delete" no-caps @click="deleteAccount" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="authenticateModel"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="text-white" style="width: 300px">
        <q-card-section>
          <div class="text-body1 text-dark">
            Are you sure you want to Authenticate this Account
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-negative">
          <q-btn
            label="Cancel"
            no-caps
            flat
            text-color="dark"
            v-close-popup
          ></q-btn>
          <q-btn flat label="Authenticate" no-caps @click="authenticateEmail" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";
import { userStore } from "src/stores/users";
import { membersStore } from "src/stores/member";
import { max600 } from "src/utils/qmQueries";
import { notify } from "src/utils/notify";
import { pickTheRandomElement } from "../../utils/randomize";
export default {
  components: {
    // memberinfoVue,
  },
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const memberProp = ref(props.member);
    const users = userStore();
    const members = membersStore();
    const secondDialog = ref(false);
    const authenticateModel = ref(false);
    const acceptedBg = ["blue-6", "orange-10", "dark"];
    const bg = ref(pickTheRandomElement(acceptedBg));
    const toggleModel = ref(false);
    const removepad = computed(() => {
      return max600() ? "q-pa-sm" : "";
    });

    const textSize = computed(() => {
      return max600() ? "text-body1" : "";
    });

    const iconSize = computed(() => {
      return max600() ? "" : "17px";
    });
    const authenticateEmail = async () => {
      const updated = await members.allowUser(props.member?.email);
      if (updated.inerror) {
        notify("Failed to authenticate");
      } else {
        if (updated.success) {
          notify("Successful authenticated");
          // updating the store
          members.changeStateEmail(props.member?.email);
          authenticateModel.value = false;
        }
      }
    };
    const deleteAccount = async () => {
      const deleted = await members.deleteMember(props.member?.email);
      if (deleted.inerror) {
        notify("failed to delete Member");
      } else {
        if (deleted.success) {
          // removing the member from the state
          members.deleteMember(props.member?.email);
          notify("account deleted");
          toggleModel.value = false;
        }
      }
    };
    return {
      bg,
      iconSize,
      authenticateEmail,
      users,
      textSize,
      removepad,
      toggleModel,
      secondDialog,
      authenticateModel,
      deleteAccount,
      memberProp,
    };
  },
};
</script>

<style></style>
