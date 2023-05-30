<template>
  <div id="container">
    <CreateAnnouncement
      :getAnnouncement="this.getAnnouncements"
      :courseId = "this.$props.courseId"
    />
    <div v-for="announcement in announcements" v-bind:key="announcement.id">
      <AnnouncementCard
        :content="announcement.content"
        :author="announcement.createdBy.name"
        :date="announcement.createdAt"
        :id="announcement.id"
        :comments="announcement.comments"
        :authorId="announcement.createdBy"
      />
    </div>
  </div>
</template>

<script>
import AnnouncementCard from "../AnnouncementCard";
import CreateAnnouncement from "../CreateAnnouncement";
import { getAnnouncementsAPI } from "../../../api/announcement";

export default {
  name: "AnnouncementContainer",
  data() {
    return {
      announcements: []
    }
  },
  props: [
    "courseId",
  ],
  methods: {
    async getAnnouncements(courseId) {
      try {
        const response = await getAnnouncementsAPI(courseId);
        this.announcements = response.data;
      } catch (error) {
      }
    },
  },
  created() {
    this.getAnnouncements(this.$props.courseId);
  },
  components: {AnnouncementCard, CreateAnnouncement}
}
</script>
