<template>
  <v-app>
    <v-container>
      <div class="mt-16">
        <v-btn v-if="this.$props.contentType !== 'assignment'"
          id="back"
          color="white"
          elevation="0"
          style="padding-left: 0; padding-right: 8px"
          @click="redirectBackToClasswork()"
        >
          <v-icon>
            mdi-chevron-left
          </v-icon>
          Back
        </v-btn>
        <v-btn v-if="this.$props.contentType === 'assignment'"
          id="back"
          color="white"
          elevation="0"
          style="padding-left: 0; padding-right: 8px"
          @click="redirectBackToClasswork()"
        >
          <v-icon>
            mdi-chevron-left
          </v-icon>
          Back
        </v-btn>
        <div class="my-4 d-flex justify-between items-end">
          <div>
            <div
              id="topic-title"
              v-if="this.$props.topicTitle"
              class="text-textGray text-md"
            >
              {{ topicTitle }}
            </div>
            <div
              id="title"
              class="text-primary text-lg font-medium"
            >
              {{ pageTitle }}
            </div>
          </div>
          <v-menu
            id="menu"
            v-if="this.isCurrentUserTheTeacher()"
            bottom
            rights
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list v-if="this.$props.contentType === 'material'">
              <v-list-item link @click="redirectToEditCourseMaterial">
                <v-list-item-title class="w-28 text-sm">
                  Edit
                </v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteCourseMaterial">
                <v-list-item-title class="w-28 text-sm text-error">
                  Delete
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list v-if="this.$props.contentType === 'assignment'">
              <v-list-item link @click="redirectToEditCourseAssignment">
                <v-list-item-title class="w-28 text-sm">
                  Edit
                </v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteCourseAssignment">
                <v-list-item-title class="w-28 text-sm text-error">
                  Delete
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list v-if="this.$props.contentType === 'quiz'">
              <v-list-item link @click="redirectToEditCourseMaterial">
                <v-list-item-title class="w-28 text-sm">
                  Edit
                </v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteQuiz">
                <v-list-item-title class="w-28 text-sm text-error">
                  Delete
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-divider id="divider" class="mb-6 bg-primary"></v-divider>
        <slot/>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import AppLayout from "./AppLayout";
import { deleteCourseMaterialById } from '../../../api/course/lessonMaterial'
import { deleteQuizById } from '../../../api/course/quiz'
import { deleteAssignmentById } from '../../../api/course/assignment'

export default {
  layout: [AppLayout],
  props: {
    courseId: String,
    pageTitle: String,
    topicTitle: String,
    contentType: String,
    contentId: String,
    teacherId: String,
    assignmentId: String
  },
  name: "CreationLayout",
  methods: {
    redirectBackToClasswork() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork`);
    },
    redirectToEditCourseMaterial() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork/${this.$props.contentType}/${this.$props.contentId}/update`);
    },
    async deleteCourseMaterial() {
      this.$store.dispatch("OPEN_SNACKBAR", "Deleting lesson material")
      try {
        await deleteCourseMaterialById(this.$props.contentId);
        this.redirectBackToClasswork();
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error deleting data");
      }
    },
    redirectBackToAssignment() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork/assignment/${this.$props.assignmentId}`);
    },
    redirectToEditCourseAssignment() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork/assignment/${this.$props.contentId}/update`);
    },
    redirectToEditQuiz() {
      this.$inertia.visit(`/course/${this.$props.courseId}/classwork/quiz/${this.$props.contentId}/update`);
    },
    async deleteQuiz() {
      this.$store.dispatch("OPEN_SNACKBAR", "Deleting Quiz")
      try {
        await deleteQuizById(this.$props.contentId);
        this.redirectBackToClasswork();
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error deleting data");
      }
    },
    async deleteCourseAssignment() {
      this.$store.dispatch("OPEN_SNACKBAR", "Deleting Assignment")
      try {
        await deleteAssignmentById(this.$props.contentId);
        this.redirectBackToClasswork();
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error deleting data");
      }
    },
    isCurrentUserTheTeacher() {
      const teacherId = (this.$store.state.user.id === this.$props.teacherId);
      return teacherId && this.$props.contentType;
    },
  },
}
</script>
