<template>
  <v-card class="rounded-md" width="253">
    <div
      class="h-48 bg-light font-semibold text-primary flex flex-col items-center"
    >
      <div class="text-base mb-5 mt-12" id="add-course-tag">Add Course</div>
      <div class="space-x-2">
        <button
          class="bg-white hover:bg-gray w-20 p-1 border border-gray-400 rounded shadow"
          color="error"
        >
          <div
            id="create-btn"
            class="text-primary font-medium text-sm"
            @click="actionRedirectToCreateCoursePage"
          >
            Create
          </div>
        </button>
        <button
          class="bg-primary hover:bg-secondary w-20 p-1 border border-gray-400 rounded shadow"
          elevation="0"
        >
          <div
            id="join-btn"
            class="text-white font-medium text-sm"
            @click="actionRedirectToJoinCoursePage"
          >
            Join
          </div>
        </button>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  methods: {
    actionRedirectToCreateCoursePage() {
      this.$inertia.visit("/course/create");
    },

    actionRedirectToJoinCoursePage() {
      this.$inertia.visit("/course/join");
    },
  },
};
</script>
