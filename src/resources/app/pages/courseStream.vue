<template>
  <v-app>
    <div v-if="loading" class="d-flex justify-center align-center h-screen">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-container v-show="!loading">
      <v-row>
        <v-col md="12" class="mb-4">
          <v-card class="rounded-lg" elevation="0" color="primary">
            <v-card-text id="course-title" class="font-weight-medium">
              {{ this.course.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          v-for="tab in tabs"
          cols="2"
          :key="tab.name"
          class="d-flex justify-center"
        >
          <v-btn
            class="mt-1"
            depressed
            :color="activeTab == tab.name ? 'light' : 'white'"
            @click="redirectTab(tab.href)"
          >
            {{ tab.name }}
          </v-btn>
        </v-col>
        <v-col
          v-show="this.$store.state.user.id == this.course.createdBy"
          cols="2"
          class="d-flex justify-center"
        >
          <v-btn
            class="mt-1"
            depressed
            :color="activeTab == 'grades' ? 'light' : 'white'"
            @click="redirectTab('/grades')"
          >
            Grades
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-col md="2" class="mt-4">
          <v-card outlined class="rounded-lg" v-if="this.isCurrentUserTheTeacher()">
            <v-card-text>
              <h2 id="code-title">Class code</h2>
              <div class="font-bold text-lg" id="class-code">
                {{ this.course.joinCode }}
              </div>
              <v-btn
                @click="copyCode(course.joinCode)"
                id="copy-btn"
                class="mt-1"
                elevation="0"
                outlined
              >
                Copy
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="10">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import AppLayout from "../components/Layout/AppLayout.vue";
import { Inertia } from "@inertiajs/inertia";
import { courseDetail } from "../../api/course/detail";

export default {
  layout: [AppLayout],
  props: {
    id: String,
  },
  data() {
    return {
      loading: false,
      tabs: [
        {
          name: "Main Page",
          href: "",
        },
        {
          name: "Classwork",
          href: "/classwork",
        },
        {
          name: "People",
          href: "/people",
        },
      ],
      activeTab: "Main Page",
      removeListener: "",
      course: {
        name: "Placeholder",
        joinCode: "AAA",
        createdBy: 0,
        room: "Placeholder",
        subject: "Placeholder",
        id: 0,
      },
    };
  },
  methods: {
    async copyCode(code) {
      try {
        await navigator.clipboard.writeText(code);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    redirectTab(href) {
      this.$inertia.visit("/course/" + this.id + href);
    },
    getActiveTab() {
      const pathname = window.location.pathname.split("/");
      if (pathname.length == 3) {
        this.activeTab = "Main Page";
      } else if (pathname.length >= 4 && pathname[3] == "people") {
        this.activeTab = "People";
      } else if (pathname.length >= 4 && pathname[3] == "classwork") {
        this.activeTab = "Classwork";
      }
    },
    async getCourseDetail() {
      this.loading = true;
      try {
        const res = await courseDetail(this.id);
        this.course = res.data;
      } catch ($e) {
        this.$store.dispatch("OPEN_SNACKBAR", "Error getting course detail");
      }
      this.loading = false;
    },
    isCurrentUserTheTeacher() {
      return (this.$store.state.user.id === this.course.createdBy)
    },
  },
  beforeMount() {
    this.getCourseDetail();
    this.removeListener = Inertia.on("navigate", (event) => {
      this.getActiveTab(event?.detail?.page?.url);
    });
  },
  beforeDestroy() {
    this.removeListener();
  },
};
</script>
<style>
#course-title {
  color: white;
  font-size: 32px;
  margin-top: 5rem;
}
.active-tab {
  background-color: #e6f8fb;
  color: #06bbd3;
}
.non-active-tab {
  background-color: white;
}
</style>
