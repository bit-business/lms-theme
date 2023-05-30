<template>
  <v-app>
    <Sidebar />
    <Snackbar />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../Sidebar.vue";
import Snackbar from "../Snackbar.vue";

export default {
  components: {
    Sidebar,
    Snackbar,
  },
  methods: {
    validate() {
      const itemStr = localStorage.getItem("token");
      const item = JSON.parse(itemStr);
      const now = new Date();
      let token = "";
      if (!itemStr || now.getTime() > item.expiry) {
        localStorage.removeItem("token");
        this.$store.dispatch("LOGOUT");
        this.$inertia.visit("/login");
      } else {
        token = item.value;
      }
      if (!token) {
        this.$store.dispatch("LOGOUT");
        this.$inertia.visit("/login");
      }
    },
  },
  mounted() {
    this.validate();
    setTimeout(() => {
      this.$store.dispatch("LOGOUT");
      this.$inertia.visit("/login");
    }, 1000 * 60 * 50);
  },
};
</script>
