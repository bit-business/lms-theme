<template>
  <CreationLayout
    :courseId="this.$props.courseId"
    :contentId="this.$props.materialId"
    pageTitle="Update Material"
  >
    <v-form ref="form" v-model="isValid">
      <v-autocomplete
        id="drop-down"
        v-model="form.topic_id"
        label="Topic"
        outlined
        required
        :items="items"
        :item-text="getItemText"
        :item-value="getItemValue"
      ></v-autocomplete>
      <v-text-field
        id="title-form"
        label="Title"
        v-model="form.title"
        outlined
        required
        :rules="fieldRules.concat(lengthRules)"
        :counter="255"
      ></v-text-field>
      <v-textarea
        id="description"
        label="Description"
        placeholder="This material is about..."
        v-model="form.content"
        outlined
        required
      ></v-textarea>
      <div class="flex">
        <v-btn color="primary" elevation="0" class="mr-6" height="56">
          <v-icon> mdi-paperclip</v-icon>
        </v-btn>
        <v-file-input
          id="file-form"
          truncate-length="100"
          accept="image/png, image/jpeg, application/pdf, image/jpg"
          label="File"
          prepend-icon=""
          v-model="file"
          outlined
          @change="setFileChanged"
        ></v-file-input>
      </div>
      <div class="flex">
        <v-btn color="primary" elevation="0" class="mr-6" height="56">
          <v-icon> mdi-link</v-icon>
        </v-btn>
        <v-text-field
          id="link-form"
          label="Link"
          v-model="form.link_url"
          outlined
        ></v-text-field>
      </div>
    </v-form>
    <div class="text-right mt-7">
      <v-btn
        id="cancel-button"
        color="error"
        elevation="0"
        @click="redirectBackToCourseMaterial"
      >
        Cancel
      </v-btn>
      <v-btn
        id="update-button"
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
import { updateCourseMaterialById, uploadFile, getCourseMaterialById } from "../../../api/course/lessonMaterial";
import { courseDetail } from "../../../api/course/detail";

export default {
  components: {CreationLayout},
  layout: [AppLayout],
  props: {
    courseId: String,
    materialId: String,
  },
  name: "CreateCourseMaterial",
  data() {
    return {
      items: [],
      snackbar: {
        isVisible: false,
        text: "",
      },
      fieldRules: [(v) => (!!v || "Field cannot be empty")],
      lengthRules: [(v) => (v.length <= 255 || "Characters are off limit")],
      isValid: false,
      isSubmitting: false,
      fileChanged: false,
      file: null,
      form: {
        topic_id: "",
        title: "",
        content: "",
        file_url: "",
        link_url: "",
        course_id: this.$props.courseId,
      },
      currentMaterial: {}
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
     async getCourseMaterial() {
      try {
        let response = await getCourseMaterialById(this.$props.materialId);
        if (response.data.topic === null) {
          response.data.topic = { title: "" };
        }
        this.currentMaterial = response.data;
        this.form.content = response.data.content;
        this.form.title = response.data.title;
        this.form.topic_id = response.data.topic.id;
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
        if (!this.fileChanged) {
          this.form.file_url = this.currentMaterial.fileUrl;
        }
        else if (this.file) {
          const fileUrlResponse = await uploadFile(this.file);
          if (fileUrlResponse.errorMessage) {
            throw fileUrlResponse.errorMessage;
          }
          this.form.file_url = fileUrlResponse.data;
        } else {
          this.form.file_url = "";
        }
        const response = await updateCourseMaterialById(this.$props.materialId, this.form);
        if (response.errorMessage) {
          throw response.errorMessage;
        }
        this.redirectBackToCourseMaterial()
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
    redirectBackToCourseMaterial() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork/material/${this.$props.materialId}`);
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
    setFileChanged() {
      this.fileChanged = true
    }
  },
  mounted() {
    this.checkTeacher(this.$props.courseId);
    this.getCourseMaterial();
    this.getTopic();
  },
};
</script>
