<template>
  <v-container>
    <div class="mx-10">
      <v-menu v-if="this.userIsTeacher">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            class="mb-2"
            color="primary"
            v-bind="attrs"
            v-on="on"
            id="create-button"
          >
            + Create
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              block
              class="mt-1"
              elevation="0"
              @click="redirectToCreateTopic(id)"
            >
              Topic
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              class="mt-1"
              elevation="0"
              @click="redirectToCreateMaterial(id)"
            >
              Material
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              class="mt-1"
              elevation="0"
              @click="redirectToCreateAssignment(id)"
            >
              Assignment
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              class="mt-1"
              elevation="0"
              @click="redirectToCreateQuiz(id)"
            >
             Quiz
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <div id="title" v-for="topic in topics" v-bind:key="topic.id">
        <div class="mb-16">
          <div class="text-primary text-lg my-4">
            <div v-if="topic.title" class="flex justify-between px-6 font-medium">
              {{ topic.title }}
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn
                      block
                      class="mt-1"
                      elevation="0"
                      @click="redirectToUpdateTopic(topic.courseId, topic.id)"
                    >
                      Update
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn
                      block
                      class="mt-1"
                      elevation="0"
                      @click="deleteTopic(topic.id)"
                    >
                      Delete</v-btn
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
          <div v-if="topic.title">
            <v-divider class="bg-primary"></v-divider>
          </div>
          <div
            v-for="lessonMaterial in topic.lessonMaterials"
            v-bind:key="lessonMaterial.id"
          >
            <v-hover v-slot="{ hover }">
              <div
                id="lesson-material"
                class="py-3 d-flex items-center justify-space-between px-6 cursor-pointer"
                :class="hover ? `bg-light` : `bg-white`"
                @click="
                  redirectToMaterialDetails(topic.courseId, lessonMaterial.id)
                "
              >
                <div class="d-flex items-center">
                  <div
                    class="w-12 h-12 bg-secondary rounded-full text-base d-flex justify-center items-center mr-4"
                  >
                    <v-icon medium color="white"> mdi-book-open </v-icon>
                  </div>
                  <div class="truncate max-w-sm">
                    {{ lessonMaterial.title }}
                  </div>
                </div>
                <div class="text-sm">
                  {{ countDate(lessonMaterial.createdAt) }}
                </div>
              </div>
            </v-hover>
            <v-divider></v-divider>
          </div>
          <div v-for="quiz in topic.quizzes" v-bind:key="quiz.id">
            <v-hover v-slot="{ hover }">
              <div
                id="quiz"
                class="py-3 d-flex items-center justify-space-between px-6 cursor-pointer"
                :class="hover ? `bg-light` : `bg-white`"
                @click="redirectToQuiz(topic.courseId, quiz.id)"
              >
                <div class="d-flex items-center">
                  <div
                    class="w-12 h-12 bg-secondary rounded-full text-base d-flex justify-center items-center mr-4"
                  >
                    <v-icon medium color="white"> mdi-clipboard-outline </v-icon>
                  </div>
                  <div class="truncate max-w-sm">
                    {{ quiz.title }}
                  </div>
                </div>
              </div>
            </v-hover>
            <v-divider></v-divider>
          </div>
          <div v-for="assignments in topic.assignments" v-bind:key="assignments.id">
            <v-hover v-slot="{ hover }">
            <div
                id="assignment"
                class="py-3 d-flex items-center justify-space-between px-6 cursor-pointer"
                :class="hover? `bg-light` : `bg-white`"
                @click="redirectToAssignmentDetails(topic.courseId, assignments.id)"
              >
                <div class="d-flex items-center">
                  <div
                    class="w-12 h-12 bg-secondary rounded-full text-base d-flex justify-center items-center mr-4"
                  >
                    <v-icon medium color="white"> mdi-clipboard-text </v-icon>
                  </div>
                  <div class="truncate max-w-sm">
                    {{ assignments.title }}
                  </div>
                </div>
                <div class="text-sm">
                  {{ countDate(assignments.createdAt) }}
                </div>
            </div>
            </v-hover>
            <v-divider></v-divider>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import CourseStream from "./courseStream.vue";
import AppLayout from "../components/Layout/AppLayout.vue";
import { getTopicAPI, deleteTopicAPI } from "../../api/topic";
import { courseDetail } from "../../api/course/detail";
import { dateSlicing } from "../../api/utils/dateSlicing";

export default {
  layout: [AppLayout, CourseStream],
  props: {
    id: String,
  },
  data() {
    return {
      topics: [],
      course: {},
      userIsTeacher: false,
    };
  },
  methods: {
    redirectToCreateTopic(id) {
      this.$inertia.visit(`/course/${id}/classwork/create`);
    },

    redirectToUpdateTopic(courseId, topicId) {
      this.$inertia.visit(`/course/${courseId}/classwork/update/${topicId}`);
    },

    redirectToCreateMaterial(id) {
      this.$inertia.visit(`/course/${id}/classwork/create/material`);
    },

    redirectToCreateQuiz(id) {
      this.$inertia.visit(`/course/${id}/classwork/create/quiz`);
    },

    redirectToMaterialDetails(id, materialId) {
      this.$inertia.visit(`/course/${id}/classwork/material/${materialId}`);
    },

    redirectToQuiz(id, quizId) {
      this.$inertia.visit(`/course/${id}/classwork/quiz/${quizId}`);

    },

    redirectToCreateAssignment(id) {
      this.$inertia.visit(`/course/${id}/classwork/create/assignment`);
    },

    redirectToAssignmentDetails(id, assignmentId) {
      this.$inertia.visit(`/course/${id}/classwork/assignment/${assignmentId}`);
    },

    async deleteTopic(topicId) {
      try {
        const response = await deleteTopicAPI(topicId);
        location.reload();
      } catch (error) {}
    },

    async getTopic(courseId) {
      const response = await getTopicAPI(courseId);
      if (response.error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      } else {
        this.topics = response.data;
        for (let i = 0; i < this.topics.length; i++) {
          this.topics[i].push({ courseId: this.$props.id });
        }
      }
    },

    async getCourse(id) {
      try {
        const response = await courseDetail(id);
        this.course = response.data;
        this.isCurrentUserTheTeacher(response.data.createdBy);
      } catch (error) {
        await this.$store.dispatch("OPEN_SNACKBAR", "Error getting data");
      }
    },

    isCurrentUserTheTeacher(teacher) {
      this.userIsTeacher = this.$store.state.user.id === teacher;
    },

    countDate(givenDate) {
      return dateSlicing(givenDate);
    },
  },
  created() {
    this.getTopic(parseInt(this.$props.id));
    this.getCourse(parseInt(this.$props.id));
  },
};
</script>
