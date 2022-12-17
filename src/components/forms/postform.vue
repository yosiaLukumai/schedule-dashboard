<template>
  <div>
    <div>
      <q-form @submit="post" ref="form">
        <div class="row">
          <div
            :class="`col-md-8 col-12 bg-secondary ${padX}`"
            style="border-radius: 12px"
          >
            <div class="text-bold text-dark text-h5">Send post to members</div>
            <q-input
              color="primary"
              v-model="titleValue"
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
              v-model="description"
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

            <div class="q-pt-xl q-pb-sm">
              <q-btn
                type="submit"
                label="Post"
                class="text-bold text-secondary"
                color="blue-6"
                icon-right="send"
                padding="7px 30px"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
