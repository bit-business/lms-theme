<template>
  <CreationLayout
    :courseId="this.$props.id"
    pageTitle="Update Quiz"
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
        required
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
        label="Description"
        placeholder="This quiz is about..."
        outlined
        v-model="form.description"
        required
      ></v-textarea>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <v-text-field
            id="start-time-form"
            label="Start Time"
            :rules="fieldRules"
            outlined
            v-model="start_time"
            type="datetime-local"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="end-time-form"
            label="End Time"
            :rules="fieldRules"
            outlined
            v-model="end_time"
            type="datetime-local"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <v-text-field
            id="duration-form"
            label="Duration"
            :rules="fieldRules"
            outlined
            type="time"
            v-model="duration"
            step="300"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="max-point-form"
            label="Max Point"
            :rules="fieldRules"
            outlined
            v-model="form.point"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="flex">
        <v-btn color="primary" elevation="0" class="mr-6" height="56">
          <v-icon> mdi-link</v-icon>
        </v-btn>
        <v-text-field
          id="link-form"
          label="Google Form Link"
          outlined
          v-model="form.link_url"
          :rules="fieldRules"
          required
        ></v-text-field>
      </div>
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
        Update
      </v-btn>
    </div>
  </CreationLayout>
</template>

<script>
import AppLayout from "../../components/Layout/AppLayout";
import CreationLayout from "../../components/Layout/CreationLayout";
import { getTopicAPI } from "../../../api/topic";
import { updateQuizById, getQuizById } from "../../../api/course/quiz";
import { courseDetail } from "../../../api/course/detail";
import * as moment from 'moment';

export default {
  components: { CreationLayout },
  layout: [AppLayout],
  props: {
    id: String,
    quizId: String
  },
  name: "CreateQuiz",
  data() {
    return {
      items: [],
      snackbar: {
        isVisible: false,
        text: "",
      },
      fieldRules: [(v) => !!v || "Field cannot be empty"],
      lengthRules: [(v) => v.length <= 255 || "Characters are off limit"],
      isValid: false,
      isSubmitting: false,
      file: null,
      duration: "",
      start_time: "",
      end_time: "",
      duration: "",
      form: {
        topic_id: "",
        title: "",
        description: "",
        link_url: "",
        start_time: "",
        end_time: "",
        duration: "",
        point: "",
        course_id: this.$props.id,
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
    parseDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainder = seconds % 3600;
        const minutes = Math.floor(remainder / 60);
        const time = moment().set({'hour': hours, 'minute': minutes}).format("hh:mm")
        return time
    },
    convertTime() {
      const duration = this.duration.split(":");
      const hours = parseInt(duration[0]) * 3600;
      const minutes = parseInt(duration[1]) * 60;
      this.form.start_time = new Date(this.start_time).toISOString().slice(0,-5) + "Z";
      this.form.end_time = new Date(this.end_time).toISOString().slice(0,-5) + "Z";
      this.form.duration = hours + minutes;
    },
    async getQuiz() {
      try {
        let response = await getQuizById(this.$props.quizId);
        if (response.data.topic === null) {
          response.data.topic = { title: "" };
        }
        this.form.content = response.data.content;
        this.form.title = response.data.title;
        this.form.topic_id = response.data.topic.id;
        this.form.link_url = response.data.linkUrl ?? "";
        this.form.point = response.data.point;
        this.duration = this.parseDuration(response.data.duration);
        this.start_time = moment(response.data.startTime).format("YYYY-MM-DDThh:mm");
        this.end_time = moment(response.data.endTime).format("YYYY-MM-DDThh:mm");
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    async postData() {
      this.isSubmitting = true;
      try {
        this.convertTime();
        const response = await updateQuizById(this.$props.quizId ,this.form);
        if (response.errorMessage) {
          throw response.errorMessage;
        }
        this.$inertia.visit(`/course/${this.$props.id}/classwork/quiz/${this.$props.quizId}`);
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error uploading data");
      }
      this.isSubmitting = false;
    },
    async checkTeacher(courseId) {
      try {
        const response = await courseDetail(courseId);
        if (response.data.createdBy !== this.$store.state.user.id) {
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
    this.getQuiz();
    this.checkTeacher(this.$props.id);
  },
};
</script>
