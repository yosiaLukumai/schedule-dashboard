<template>
  <div class="" >
    <q-card class="my-card q-pa-md" style="border-radius: 14px;" >
      <q-item dense clickable :to="`post/${post?._id}`">
        <q-item-section>
          <q-item-label :class="`${decideTextSize} q-pt-sm text-bold text-dark`">{{
            post?.title.slice(0, 39) 
          }}..</q-item-label>
          <q-item-label caption lines="1" class="text-dark q-pt-sm text-body1"
            >{{ post?.body }}..</q-item-label
          >
          <q-item-label class="text-orange-10 q-pt-md text-body2 text-bold"
            >By. {{ post?.author?.username }}</q-item-label
          >
        </q-item-section>
        <q-item-section avatar side>
          <q-icon name="ti-more" color="orange-10" />
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script>
import {max600} from "src/utils/qmQueries"
import{computed} from "vue"
export default {
  props: {
    post: {
      type: Object,
      default: () => ({
        _id: "638ca917eac9b9963552437e",
        title: "Let meet up today at this time here in Lab",
        body: "remember so much to be here in time so that evverything to go well as planned",
        author: {
          _id: "638ca82c444028e3b400169d",
          email: "yosiadevs@gmail.com",
          superAdmin: true,
          username: "yosia",
          password: "goodui",
          authenticated: true,
          emailVerified: true,
          posts: [],
          createdAt: "2022-12-04T14:01:16.024Z",
          updatedAt: "2022-12-04T14:01:16.024Z",
          __v: 0,
        },
        createdAt: "2022-12-04T14:05:11.380Z",
        updatedAt: "2022-12-04T14:05:11.380Z",
        __v: 0,
      }),
    },
  },
  setup() {
    const decideTextSize = computed(()=> {
      return max600() ? 'text-h6' : 'text-body2'
    })

    return {decideTextSize}
  }
};
</script>

<style></style>
