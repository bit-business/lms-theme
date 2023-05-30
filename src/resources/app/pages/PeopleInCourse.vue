<template>
  <v-container>
    <div class="mx-10">
      <div class="text-primary text-lg px-6 my-4 font-medium" id="title"> Teachers </div>
      <v-divider class="bg-primary"></v-divider>
      <div
        v-for="teacher in peoples"
        v-bind:key="teacher.name"
        v-if="teacher.role == 'teacher'"
        class="mb-16"
      >
        <div class="py-3 d-flex items-center px-6">
          <v-avatar class="bg-secondary" id="avatar" size="48">
            <v-icon medium color="white"> mdi-account </v-icon>
          </v-avatar>
          <div class="ml-4" id="name">{{ teacher.name }}</div>
        </div>
        <v-divider></v-divider>
      </div>
      <div class="text-primary text-lg px-6 my-4 font-medium" id="title"> Classmates </div>
      <v-divider class="bg-primary"></v-divider>
      <div
        v-for="student in peoples"
        v-bind:key="student.name"
        v-if="student.role == 'student'"
      >
        <div class="py-3 d-flex items-center px-6">
          <v-avatar class="bg-secondary" id="avatar" size="48">
            <v-icon medium color="white"> mdi-account </v-icon>
          </v-avatar>
          <div class="ml-4" id="name">{{ student.name }}</div>
        </div>
        <v-divider></v-divider>
      </div>
    </div>
  </v-container>
</template>
<script>
import api from "../../api/people";
import CourseStream from "./courseStream.vue";
import AppLayout from "../components/Layout/AppLayout.vue";
export default {
  layout: [AppLayout, CourseStream],
  props: {
    id: {
      default: 1,
    },
  },
  data() {
    return {
      peoples: [
        {
          name: "Placeholder",
          role: "teacher",
        },
      ],
    };
  },
  methods: {
    async getData(id) {
      try {
        const res = await api.people(id);
        this.peoples = res.data;
      } catch (e) {}
    },
  },
  mounted() {
    this.getData(this.id);
  },
};
</script>
