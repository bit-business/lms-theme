<template>
  <v-app>
    <div class="text-center d-flex flex-col justify-center h-screen">
      <div
        id="title"
        class="text-xl font-weight-bold text-primary mb-4"
      >
        404
      </div>
      <div
        id="sub-title"
        class="text-lg font-weight-medium text-black"
      >
        Uh Oh! Seems like you are lost
      </div>
    </div>
  </v-app>
</template>

<script>
import AppLayout from "../components/Layout/AppLayout";

export default {
  name: "404",
  layout: [AppLayout],
}
</script>
