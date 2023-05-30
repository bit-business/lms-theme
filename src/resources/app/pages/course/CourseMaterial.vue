<template>
  <CreationLayout
    :courseId="this.$props.courseId"
    :pageTitle="this.material.title"
    :topicTitle="this.material.topic.title"
    :contentId="this.$props.materialId"
    :teacherId="this.teacherId"
    contentType="material"
  >
    <div id="description" v-if="this.material.content" class="text-base mb-9">
      {{ this.material.content }}
    </div>
    <div
      v-if="this.material.fileUrl"
      class="flex flex-col justify-center items-center"
    >
      <embed :src="this.material.fileUrl" width="80%" height="500px" />
      <a :href="this.material.fileUrl" target="_blank" class="mt-2 mb-10">
        <v-btn color="primary">Download File</v-btn>
      </a>
    </div>
    <div
      v-if="this.material.linkUrl"
      class="flex flex-col justify-center items-center"
    >
      <a :href="this.material.linkUrl" target="_blank" class="mt-2 mb-10">
        {{ this.material.linkUrl }}
      </a>
    </div>
    <div
      id="header-comment"
      class="text-primary text-lg font-medium"
    >
      Comments
      <v-icon
        id="icon-comment"
        color="primary"
      >
        mdi-forum
      </v-icon>
      <v-divider id="divider" class="mb-4 bg-primary"></v-divider>
    </div>
    <div v-for="comment in material.comments" v-bind:key="comment.id">
    <ListComment
      :name="comment.createdBy.name"
      :date="comment.createdAt"
      :content="comment.content"
      :contentId="comment.id"
      :authorId="comment.createdBy.id"
      :courseId="material.courseId"
      :teacherId="teacherId"
    >
    </ListComment>
    </div>
    <CreateComment
      :materialId="this.$props.materialId"
      :getCourseMaterial = "this.getCourseMaterial"
    >
    </CreateComment>
  </CreationLayout>
</template>

<script>
import AppLayout from "../../components/Layout/AppLayout";
import CreationLayout from "../../components/Layout/CreationLayout";
import CreateComment from "../../components/CreateComment";
import ListComment from "../../components/ListComment";
import { getCourseMaterialById } from "../../../api/course/lessonMaterial";
import { courseDetail } from "../../../api/course/detail";

export default {
  name: "CourseMaterial",
  components: {CreationLayout, CreateComment, ListComment},
  layout: [AppLayout],
  props: {
    courseId: String,
    materialId: String,
  },
  data() {
    return {
      material: {},
      teacherId: String,
    }
  },
  methods: {
    async getCourseMaterial() {
      try {
        let response = await getCourseMaterialById(this.$props.materialId);
        if (response.data.topic === null) {
          response.data.topic = { title: "" };
        }
        this.material = response.data;
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
    async getTeacher(courseId) {
      try {
        const response = await courseDetail(courseId);
        if (response.data.createdBy){
          this.teacherId = response.data.createdBy
        }
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },
  },
  created() {
    this.getCourseMaterial();
    this.getTeacher(this.$props.courseId);
  },
}
</script>
