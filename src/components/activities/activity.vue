<template>
  <div>
    <q-card class="q-py-sm my-card bg-dark" flat>
      <q-item>
        <q-item-section avatar>
          <q-avatar color="white" size="45px" text-color="primary">{{
            initial
          }}</q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <span class="text-bold text-body1 text-blue-6"
              >{{ username + "  " }}
            </span>
            <span class="text-body2 text-white"> {{ task }}</span>
          </q-item-label>
          <q-item-label caption>
            <div class="row text-white">
              <div class="col-9">
                <q-icon name="alarm" size="19px"></q-icon>
                <span style="opacity: 0.6"
                  >{{ "    " + date }} at {{ time }}</span
                >
              </div>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: "yosia@",
    },
    initial: {
      type: String,
      default: "J",
    },
    time: {
      type: String,
      default: "8:00 am",
    },
    date: {
      type: String,
      default: "2 Dec 2022",
    },
    task: {
      type: String,
      default: "Added a post as reminder on project",
    },
  },
};
</script>

<style></style>
