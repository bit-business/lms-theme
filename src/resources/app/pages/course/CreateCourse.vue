<template>
  <v-app>
    <v-snackbar v-model="snackbar.isVisible" :timeout="3000" top>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar.isVisible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div class="flex justify-center items-center">
      <v-card id="join-card" elevation="2" width="400px" class="p-6">
        <div id="title" class="text-base mb-2">Create a New Course</div>
        <v-form v-model="form.isValid" ref="form">
          <div>
            <v-text-field
              id="name-form"
              label="Course Name"
              v-model="form.values.name"
              :rules="form.rules.name"
              required
              outlined
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              id="subject-form"
              label="Subject"
              v-model="form.values.subject"
              :rules="form.rules.subject"
              required
              outlined
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              id="room-form"
              label="Room"
              v-model="form.values.room"
              :rules="form.rules.room"
              required
              outlined
            ></v-text-field>
          </div>
          <div class="mt-3 flex justify-end">
            <v-btn
              id="cancel-btn"
              depressed
              color="gray"
              @click="actionBackToHomepage"
            >
              Cancel
            </v-btn>
            <v-btn
              id="create-btn"
              class="ml-3"
              depressed
              color="primary"
              @click="submitForm"
              :loading="form.isSubmitting"
              :disabled="!form.isValid"
            >
              Create
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { createCourse } from "../../../api/course/create";
import AppLayout from "../../components/Layout/AppLayout.vue";

export default {
  layout: [AppLayout],
  components: {},
  beforeCreate() {
    if (!this.$store.state.isAuthenticated) {
      window.location.assign("/login");
    }
  },
  data: () => ({
    snackbar: {
      isVisible: false,
      text: "",
    },
    form: {
      isValid: false,
      isSubmitting: false,
      values: {
        name: "",
        subject: "",
        room: "",
      },
      rules: {
        name: [
          (v) => v.length <= 255 || "Name must be less than 256 characters",
          (v) => !!v || "Name is required",
        ],
        subject: [
          (v) => v.length <= 255 || "Subject must be less than 256 characters",
          (v) => !!v || "Subject is required",
        ],
        room: [
          (v) => v.length <= 255 || "Room must be less than 256 characters",
          (v) => !!v || "Room is required",
        ],
      },
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    async submitForm() {
      this.form.isSubmitting = true;
      this.validate();

      if (!this.form.isValid) return;

      const { data, error, errorMessage } = await createCourse({
        name: this.form.values.name,
        subject: this.form.values.subject,
        room: this.form.values.room,
      });

      if (error) {
        this.showSnackbar(errorMessage);
        this.form.isSubmitting = false;
        return;
      }

      window.location.assign("/course/" + data.id);
    },

    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.isVisible = true;
    },

    actionBackToHomepage() {
      window.location.assign("/");
    },
  },
};
</script>
