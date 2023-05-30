<template>
  <div id="announcement-container">
    <AnnouncementContainer :courseId="this.id" />
  </div>
</template>
<script>
import AnnouncementContainer from "../../components/Container/AnnouncementContainer";
import CourseStream from "../courseStream";
import AppLayout from "../../components/Layout/AppLayout";

export default {
  layout: [AppLayout, CourseStream],
  components: { AnnouncementContainer },
  props: {
    id: String,
  },
  beforeCreate() {
    if (!this.$store.state.isAuthenticated) {
      window.location.assign("/login");
    }
  },
};
</script>
