<template>
  <q-card
    class="my-card q-pa-md"
    style="border-radius: 12px; width: 800px; max-width: 80vw"
  >
    <q-form @submit.prevent="saveChanges" ref="form">
      <q-card-section>
        <div class="row">
          <div :class="`col-12`">
            <div class="text-bold text-dark text-h5">Update the post</div>
            <q-input
              color="primary"
              v-model="titles"
              label="Post title"
              class="q-pt-md"
              maxlength="90"
              label-color="primary"
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Description is required',
                (val) => val.trim().length < 100 || 'Title is too long',
              ]"
              hint="Let meet up at 12 pm today"
            >
              <template v-slot:prepend>
                <q-icon name="title" color="primary" />
              </template>
            </q-input>

            <q-input
              color="primary"
              v-model="bodys"
              label="Post Description"
              class="q-pt-md"
              type="textarea"
              autogrow
              label-color="primary"
              :rules="[
                (val) =>
                  (val && val.trim().length > 0) || 'Description is required',
                (val) =>
                  val.trim().length < 180 ||
                  'Description  is too long reduce it',
              ]"
              hint="Let meet up for more practicals and testin in the lab at 9:00 am"
            >
              <template v-slot:prepend>
                <q-icon name="description" color="primary" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          :label="thereChanges ? 'Save Changes' : 'Update'"
          color="primary"
          text-color="negative"
          type="submit"
          :disable="!thereChanges"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { ref, watch } from "vue";
import { notify } from "src/utils/notify";
import { postsStore } from "src/stores/post";
export default {
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    let postRef = ref(props.postData);
    const store = postsStore();
    const titles = ref(props.postData?.title);
    const bodys = ref(props.postData?.body);
    const thereChanges = ref(false);
    const author = ref(props.postData?.author?._id).value;
    const postId = ref(props.postData._id).value;

    watch(titles, (prev, current) => {
      if (prev != current) {
        thereChanges.value = true;
      }
    });

    watch(bodys, (prev, current) => {
      if (prev != current) {
        thereChanges.value = true;
      }
    });

    const saveChanges = async () => {
      let title = titles.value;
      let body = bodys.value;
      const updated = await store.updatePost({ title, body, author }, postId);
      if (updated.inerror) {
        notify(updated.message);
      } else {
        if (!updated.success) {
          notify("Failed to update the post");
        } else {
          if (updated.body.acknowledged) {
            // passing the data into the state
            postRef.value.title = title;
            postRef.value.body = body;
            store.updateOnePost(postRef.value);
            context.emit("closeDialog")
            // emitting the event to parent for dialog closing
            notify("Successful updated");
          }
        }
      }
    };

    return { saveChanges, titles, bodys, thereChanges };
  },
};
</script>

<style></style>
