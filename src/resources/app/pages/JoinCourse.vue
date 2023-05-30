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
        <div id="title" class="text-base mb-2">Enter Code</div>
        <div id="sub-title" class="text-s text-textGray mb-5">
          Class code provided by your teacher
        </div>
        <v-form v-model="isFormValid" ref="form">
          <div>
            <v-text-field
              id="code-form"
              label="Class Code"
              v-model="code"
              :rules="joinCodeRules"
              required
              outlined
            ></v-text-field>
          </div>
          <div class="mt-3 flex justify-end">
            <v-btn
              id="join-btn"
              depressed
              color="primary"
              @click="submit"
              :disabled="!isFormValid"
            >
              Join
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import api from "../../api/joinCourse";
import AppLayout from "../components/Layout/AppLayout.vue";

export default {
  layout: [AppLayout],
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
    code: "",
    isFormValid: false,
    joinCodeRules: [(v) => !!v || "Class code is required"],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    async submit() {
      this.validate();
      if (this.isFormValid) {
        const { data, error, errorMessage } = await api.joinCourse({
          code: this.code,
        });

        if (error) {
          this.showSnackbar(errorMessage);
        } else {
          window.location.assign("/course/" + data.courseId);
        }
      }
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
