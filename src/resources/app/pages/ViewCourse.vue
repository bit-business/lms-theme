<template>
  <div>
    <div class="h-16"></div>
    <div class="flex flex-row flex-wrap items-start space-x-10">
      <div class="m-0" />
      <div v-for="post in posts" v-bind:key="post.id">
        <CourseCard
          :course-id="post.courseId"
          :course-name="post.name"
          :room-num="post.room"
          :teacher-name="post.createdBy"
          id="course-card"
          class="mb-10"
        />
      </div>

      <AddCourseCard id="add-course-card" class="mb-10" />
    </div>
  </div>
</template>

<script>
import AddCourseCard from "../components/AddCourseCard.vue";
import CourseCard from "../components/CourseCard.vue";
import AppLayout from "../components/Layout/AppLayout.vue";
import api from "../../api/view";

export default {
  layout: [AppLayout],

  beforeCreate() {
    if (!this.$store.state.isAuthenticated) {
      this.$inertia.visit("/login");
    }
  },

  data() {
    return {
      posts: [
        {
          id: 0,
          name: "Placeholder",
          subject: "Placeholder",
          room: "R-00",
          joinCode: "R00M00",
          createdBy: 1,
          createdAt: null,
          updatedAt: null,
        },
      ],
    };
  },

  methods: {
    async getData() {
      try {
        const res = await api.view();
        this.posts = res.data;
      } catch (e) {}
    },
  },
  mounted() {
    this.getData();
  },

  components: {
    CourseCard,
    AddCourseCard,
  },
};
</script>
