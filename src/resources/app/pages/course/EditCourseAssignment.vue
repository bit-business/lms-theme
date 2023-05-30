<template>
  <CreationLayout
    :courseId="this.$props.id"
    pageTitle="Edit Assignment Rules"
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
            :rules="fieldRules"
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
        @click="redirectBackToAssignment"
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
import { updateAssignmentById, getCourseAssignmentById, uploadFile } from "../../../api/course/assignment";
import { courseDetail } from "../../../api/course/detail";
import * as moment from 'moment';


export default {
  components: {CreationLayout},
  layout: [AppLayout],
  props: {
    courseId: String,
		assignmentId: String,
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
        course_id: this.$props.courseId,
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
        const response = await getTopicAPI(this.$props.courseId);
        this.items = response.data;
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
      this.isSubmitting = false;
    },
    convertTime() {
      this.form.due_date = new Date(this.due_date).toISOString().slice(0,-5) + "Z"
    },
    async getAssignment() {
    	try {
        let response = await getCourseAssignmentById(this.$props.assignmentId);
        if (response.data.topic === null) {
				  response.data.topic = { title: "" };
				}
				this.currentAssignment = response.data;
				this.form.topic_id = response.data.topic.id;
				this.form.title = response.data.title;
				this.due_date = moment(response.data.dueDate).format("YYYY-MM-DDThh:mm");
				this.form.due_date = moment(response.data.dueDate).format("YYYY-MM-DDThh:mm");
				this.form.description = response.data.description;
				this.form.point = response.data.point;
				this.form.link_url = response.data.linkUrl ?? "";
				if (response.data.fileUrl) {
          const filename = response.data.fileUrl.split("files/")[1];
          const fileResponse = await fetch(response.data.fileUrl);
          const blob = fileResponse.blob();
          const file = new File([blob], filename, { type: 'application/pdf' });
          this.file = file;
        }
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    async postData() {
      this.isSubmitting = true;
      try {
        if (this.file) {
          const fileUrlResponse = await uploadFile(this.file);
          this.form.file_url = fileUrlResponse.data;
        } else {
          this.form.file_url = "";
        }
        this.convertTime();
        const response = await updateAssignmentById(this.$props.assignmentId, this.form);
        this.redirectBackToAssignment()
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
    redirectBackToAssignment() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork/assignment/${this.$props.assignmentId}`);
    },
    redirectBackToClasswork() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork`);
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
    this.checkTeacher(this.$props.courseId);
    this.getAssignment();
  },
};
</script>
