<template>
  <CreationLayout
    :courseId="this.$props.id"
    pageTitle="Create Assignment"
  >
    <v-form ref="form" v-model="isValid">
      <v-autocomplete
        id="drop-down"
        v-model="form.topic_id"
        :items="items"
        label="Topic"
        outlined
        :item-text="getItemText"
        :item-value="getItemValue"
      ></v-autocomplete>
      <v-text-field
        id="title-form"
        label="Title"
        :rules="fieldRules.concat(lengthRules)"
        :counter="255"
        outlined
        v-model="form.title"
        required
      ></v-text-field>
      <v-textarea
        id="description"
        label="Assignment Instruction"
        placeholder="This assignment is about..."
        outlined
        v-model="form.description"
      ></v-textarea>
      <div class="flex">
        <v-btn color="primary" elevation="0" class="mr-6" height="56">
          <v-icon> mdi-paperclip</v-icon>
        </v-btn>
        <v-file-input
          id="file-form"
          truncate-length="100"
          outlined
          accept="image/png, image/jpeg, application/pdf, image/jpg"
          label="File"
          prepend-icon=""
          v-model="file"
        ></v-file-input>
      </div>
      <div class="flex">
        <v-btn color="primary" elevation="0" class="mr-6" height="56">
          <v-icon> mdi-link</v-icon>
        </v-btn>
        <v-text-field
          id="link-form"
          label="Link"
          outlined
          v-model="form.link_url"
        ></v-text-field>
      </div>
      <v-row justify="space-between">
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            id="due-date"
            label="Due date"
            :rules="fieldRules.concat(minDateRule)"
            outlined
            type="datetime-local"
            v-model="due_date"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            id="max-point-form"
            label="Max Point"
            outlined
            v-model="form.point"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <div class="text-right mt-7">
      <v-btn
        id="cancel-button"
        color="error"
        elevation="0"
        @click="redirectBackToClasswork"
      >
        Cancel
      </v-btn>
      <v-btn
        id="create-button"
        class="ml-4"
        color="primary"
        elevation="0"
        @click="postData"
        :disabled="!isValid"
        :loading="isSubmitting"
      >
        Create
      </v-btn>
    </div>
  </CreationLayout>
</template>

<script>
import AppLayout from "../../components/Layout/AppLayout";
import CreationLayout from "../../components/Layout/CreationLayout";
import { getTopicAPI } from "../../../api/topic";
import { createCourseAssignment, uploadFile } from "../../../api/course/assignment";
import { courseDetail } from "../../../api/course/detail";

export default {
  components: {CreationLayout},
  layout: [AppLayout],
  props: {
    id: String,
  },
  name: "CreateCourseAssignment",
  data() {
    return {
      items: [],
      snackbar: {
        isVisible: false,
        text: "",
      },
      fieldRules: [(v) => (!!v || "Field cannot be empty")],
      minDateRule: [(v) => (new Date(v) >= new Date() || "Cannot set before today")],
      isValid: false,
      isSubmitting: false,
      file: null,
      due_date: '',
      form: {
        course_id: this.$props.id,
        topic_id: '',
        title: '',
        due_date: '',
        description: '',
        point:'',
        file_url: '',
        link_url: '',
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async getTopic() {
      this.isSubmitting = true;
      try {
        const response = await getTopicAPI(this.$props.id);
        this.items = response.data;
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
      this.isSubmitting = false;
    },
    convertTime() {
      this.form.due_date = new Date(this.due_date).toISOString().slice(0,-5) + "Z"
    },
    async postData() {
      this.isSubmitting = true;
      try {
        if (this.file) {
          const fileUrlResponse = await uploadFile(this.file);
          if (fileUrlResponse.errorMessage) {
            throw fileUrlResponse.errorMessage;
          }
          this.form.file_url = fileUrlResponse.data;
        }
        this.convertTime();
        const response = await createCourseAssignment(this.form);
        if (response.errorMessage) {
          throw response.errorMessage;
        }
        this.$inertia.visit(`/course/${this.$props.id}/classwork`);
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error uploading data");
      }
      this.isSubmitting = false;
    },
    async checkTeacher(courseId) {
      try {
        const response = await courseDetail(courseId);
        if (response.data.createdBy !== this.$store.state.user.id){
          this.$inertia.visit("/404");
        }
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    redirectBackToClasswork() {
      this.$inertia.visit(`/course/${this.$props.id}/classwork`);
    },
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.isVisible = true;
    },
    getItemValue(item) {
      return item.id;
    },
    getItemText(item) {
      return item.title;
    },
  },
  mounted() {
    this.getTopic();
    this.checkTeacher(this.$props.id);
  },
};
</script>
