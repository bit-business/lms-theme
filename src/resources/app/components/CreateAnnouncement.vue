<template>
  <div>
    <v-snackbar v-model="snackbar.isVisible" :timeout="3000" top>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar.isVisible = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-hover
      v-slot="{ hover }"
      true
    >
      <v-card
        :elevation="hover && !startWriting ? 5 : 0"
        class="mx-10 my-3"
        width="auto"
        outlined
      >
        <div
          id="initial-form"
          v-on:click="startWriting = true"
          v-if="!startWriting"
          class="cursor-pointer px-6 py-4"
        >
          <v-avatar class="bg-secondary mr-4" id="avatar" size="48">
            <v-icon medium color="white"> mdi-account </v-icon>
          </v-avatar>
          <span
            id="initial-text"
            class="text-textGray"
          >
          Write Something
        </span>
        </div>
        <div
          id="true-form"
          v-if="startWriting"
        >
          <v-form
            v-model="isFormValid"
            ref="form"
            class="mx-6 my-4"
          >
            <div>
              <v-textarea
                outlined
                v-model="announcement"
                :rules="announceRules.concat(lengthRules)"
                :counter="65535"
                label="Announcement"
                placeholder="Announcement for everyone..."
              ></v-textarea>
            </div>
            <div class="text-right">
              <v-btn
                depressed
                color=light
                @click="startWriting = false"
                class="mr-4"
              >
                <div
                  id="cancel-button"
                  class="text-primary"
                >
                  Cancel
                </div>
              </v-btn>
              <v-btn
                id="post-button"
                depressed
                color=primary
                @click="postAnnouncement"
                :disabled="!isFormValid"
              >
                Post
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { createAnnouncementAPI } from "../../api/announcement";

export default {
  name: "CreateAnnouncement",
  props: [
    "getAnnouncement",
    "courseId",
  ],
  data() {
    return {
      announcement: '',
      startWriting: false,
      isFormValid: false,
      announceRules: [(v) => (!!v || "Announcement cannot be empty")],
      lengthRules: [(v) => (v.length <= 65535 || "Characters are off limit")],
      snackbar: {
        isVisible: false,
        text: "",
      },
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    async postAnnouncement() {
      this.validate();
      if (this.isFormValid) {
        const {error, errorMessage} = await createAnnouncementAPI({
          courseId: parseInt(this.$props.courseId),
          content: this.announcement,
        });

        if (error) {
          this.showSnackbar(errorMessage);
        } else {
          this.$refs.form.reset();
          this.startWriting = false;
          this.$props.getAnnouncement(this.$props.courseId);
        }
      }
    },

    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.isVisible = true;
    },
  }
}
</script>

<style scoped>

</style>
