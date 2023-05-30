<template>
  <CreationLayout
    :courseId="this.$props.courseId"
    :pageTitle="this.quiz.title"
    :topicTitle="this.quiz.topic.title"
    :contentId="this.$props.quizId"
    :teacherId="this.teacherId"
    contentType="quiz"
  >
    <div id="description" v-if="this.quiz.description" class="text-base mb-9">
      {{ this.quiz.description }}
    </div>
    <div id="start-time" class="text-base mb-5">
      Start Time: {{ countDate(this.quiz.startTime) }}
    </div>
    <div id="end-time" class="text-base mb-5">
      End Time: {{ countDate(this.quiz.endTime) }}
    </div>
    <div id="duration" class="text-base mb-5">
      Duration: {{ calculateDuration(this.quiz.duration) }}
    </div>
    <div class="w-full flex justify-center">
      <v-btn
          v-if="checkTime() == 2"
          dark
          class="mb-2"
          color="primary"
          v-bind="attrs"
          v-on="on"
          id="create-button"
        >
          Start Attempt
      </v-btn>
      <div v-if="checkTime() == 0">
        This quiz is not available yet
      </div>
      <div v-if="checkTime() == 1">
        This quiz has been ended
      </div>
    </div>
  </CreationLayout>
</template>

<script>
import AppLayout from "../../components/Layout/AppLayout";
import CreationLayout from "../../components/Layout/CreationLayout";
import { getQuizById } from "../../../api/course/quiz";
import { courseDetail } from "../../../api/course/detail";
import * as moment from 'moment';

export default {
  name: "Quiz",
  components: { CreationLayout },
  layout: [AppLayout],
  props: {
    courseId: String,
    quizId: String,
  },
  data() {
    return {
      quiz: {
        topic: {
          title: ""
        },
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        duration: 0
      },
      teacherId: String,
    }
  },
  methods: {
    async getCourseQuiz() {
      try {
        let response = await getQuizById(this.$props.quizId);
        if (response.data.topic === null) {
          response.data.topic = { title: "" };
        }
        this.quiz = response.data;
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
    calculateDuration(seconds) {
      if (!seconds) {
        return ""
      }
      const hours = Math.floor(seconds / 3600)
      const remainder = seconds % 3600
      const minutes = Math.floor(remainder / 60)
      return `${hours && hours + " Hours"} ${minutes !== 0 ? minutes + " Minutes" : ""}`
    },
    countDate(givenDate) {
      if (!givenDate) {
        return ""
      }
      const date = new Date(givenDate)
      return `${date.toDateString()} ${date.toLocaleTimeString()}`
    },
    checkTime() {
      const startTime = moment(this.quiz.startTime)
      const endTime = moment(this.quiz.endTime)
      const now = moment()
      if (startTime > now) {
        return 0
      } else if (endTime < now) {
        return 1
      } else if (startTime <= now && endTime >= now) {
        return 2
      }
    }
  },
  created() {
    this.getCourseQuiz();
    this.getTeacher(this.$props.courseId);
  },
}
</script>
