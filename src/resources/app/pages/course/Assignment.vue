<template>
  <CreationLayout
    :courseId="this.$props.courseId"
    :pageTitle="this.assignment.title"
    :topicTitle="this.assignment.topic.title"
    :contentId="this.$props.assignmentId"
    :teacherId="this.teacherId"
    contentType="assignment"
  >
    <div id="description" v-if="this.assignment.description" class="text-base mb-9">
      {{ this.assignment.description }}
    </div>
    <div
      v-if="this.assignment.fileUrl"
    >
      <a :href="this.assignment.fileUrl" target="_blank" class="mt-2 mb-10">
        <v-btn color="primary"><v-icon left> mdi-download</v-icon> Download File </v-btn>
      </a>
    </div>
    <div
      v-if="this.assignment.linkUrl"
      class="mt-5"
    >
      <a :href="this.assignment.linkUrl" target="_blank" class="mt-2 mb-10">
        {{ this.assignment.linkUrl }}
      </a>
    </div>
    <div id="detail-assignment" class="mt-5">
      <v-row>
        <v-col cols="2"> Status </v-col>
        <v-col
          :class="hasSubmission ? 'text-success' : this.isOverdue ? 'text-error' : 'text-textGray'"
        > : {{
          this.hasSubmission? "Submitted" : "No Submission"
          }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"> Due Date </v-col>
        <v-col> : {{ date(this.assignment.dueDate) }} </v-col>
      </v-row>
      <v-row v-if="this.assignment.point">
        <v-col cols="2"> Max Point </v-col>
        <v-col> : {{ this.assignment.point }} </v-col>
      </v-row>
    </div>
    <v-form ref="form" v-model="isValid" class="mt-8">
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
          :disabled="uploadText === 'Edit' || isOverdue"
        ></v-file-input>
      </div>
      <div class="flex"
           :class="this.form.link_url && uploadText === 'Edit' ? `align-center` : `align-top`"
      >
        <v-btn color="primary" elevation="0" class="mr-6" height="56">
          <v-icon> mdi-link</v-icon>
        </v-btn>
        <div v-if="form.link_url && uploadText === 'Edit'">
          <a :href="this.form.link_url" target="_blank" class="mt-2 mb-10">
            {{ this.form.link_url }}
          </a>
        </div>
        <v-text-field
          v-if="!this.form.link_url || uploadText === 'Save'"
          id="link-form"
          label="Link"
          outlined
          v-model="form.link_url"
          :disabled="uploadText === 'Edit' || isOverdue"
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
        @click="uploadText === 'Edit' ? changeUploadText(): postData()"
        :disabled="!(form.link_url || file) || isOverdue"
        :loading="isSubmitting"
      >
        {{ this.uploadText }}
      </v-btn>
    </div>
  </CreationLayout>
</template>
<script>
import CreationLayout from "../../components/Layout/CreationLayout";
import AppLayout from "../../components/Layout/AppLayout";
import { getCourseAssignmentById } from "../../../api/course/assignment";
import { courseDetail } from "../../../api/course/detail";
import { uploadFile } from "../../../api/course/assignment";
import { createSubmission, editSubmission, readSubmission } from "../../../api/course/submission";
import { dateSlicing } from "../../../api/utils/dateSlicing";

export default {
  name: "Assignment",
  components: {CreationLayout},
  layout: [AppLayout],
  props: {
    courseId: String,
    assignmentId: String,
  },
  data() {
    return {
      isOverdue: false,
      isValid: false,
      hasSubmission: false,
      file: null,
      items: [],
      assignment: {},
      teacherId: String,
      isSubmitting: false,
      uploadText: "Save",
      submissionId: null,
      form: {
        assignment_id: '',
        file_url: '',
        link_url: '',
      },
    }
  },
  methods: {
    async getCourseAssignment() {
      try {
        let response = await getCourseAssignmentById(this.$props.assignmentId);
        if (response.data.topic === null) {
          response.data.topic = {title: ""};
        }
        this.assignment = response.data;
        this.isOverdue = this.overdue(this.assignment.dueDate);
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    async getTeacher(courseId) {
      try {
        const response = await courseDetail(courseId);
        if (response.data.createdBy) {
          this.teacherId = response.data.createdBy
        }
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    async postData() {
      this.isSubmitting = true;
      this.form.assignment_id = this.$props.assignmentId;
      try {
        if (this.file) {
          const fileUrlResponse = await uploadFile(this.file);
          if (fileUrlResponse.errorMessage) {
            throw fileUrlResponse.errorMessage;
          }
          this.form.file_url = fileUrlResponse.data;
        }
        let response;
        if (!this.hasSubmission) {
          response = await createSubmission(this.form);
        } else {
          response = await editSubmission(this.form, this.submissionId);
        }
        if (response.errorMessage) {
          throw response.errorMessage;
        }
        this.changeUploadText();
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error uploading data");
      }
      this.isSubmitting = false;
    },
    async getExistingSubmission() {
      try {
        let response = await readSubmission(this.$props.assignmentId);
        this.form.link_url = response?.data.linkUrl;
        this.submissionId = response?.data.id;

        if (response.data.fileUrl) {
          const filename = response.data.fileUrl.split("files/")[1];
          const fileResponse = await fetch(response.data.fileUrl);
          const blob = fileResponse.blob();
          this.file = new File([blob], filename, {type: 'application/pdf'});
        }

        if (response.data.status === 'submitted') {
          this.uploadText = "Edit";
          this.hasSubmission = true;
        }
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    redirectBackToClasswork() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork`);
    },
    getItemValue(item) {
      return item.id;
    },
    getItemText(item) {
      return item.title;
    },
    changeUploadText() {
      if (this.uploadText === "Save") {
        this.uploadText = "Edit"
      } else {
        this.uploadText = "Save"
      }
    },
    overdue(dueDate) {
      let now = new Date();
      now = now.getFullYear() + `${(parseInt(now.getMonth()) + 1) > 9 ? "-" : "-0"}` + (parseInt(now.getMonth()) + 1) + "-" + now.getDate() + "T" + now.getHours() + ":" + now.getMinutes() + ":00Z";
      return now > dueDate
    },
    date(givenDate) {
      return `${dateSlicing(givenDate)} ${givenDate.slice(11,16)}`;
    },
  },
  created() {
    this.getCourseAssignment();
    this.getExistingSubmission();
    this.getTeacher(this.$props.courseId);
  },
}
</script>
