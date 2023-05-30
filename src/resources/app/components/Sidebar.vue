<template>
  <v-navigation-drawer
    app
    permanent
    :mini-variant.sync="mini"
    v-model="drawer"
    class="nav-drawer"
  >
    <v-list>
      <v-list-item class="px-2" v-show="mini">
        <v-list-item-avatar>
          <img :src="getAvatar" alt="User Avatar"/>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item v-show="mini" link @click="redirectToCreateCoursePage">
        <v-list-item-icon>
          <v-icon color="primary"> mdi-plus</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item v-show="!mini" @click.stop="hideSidebar">
        <v-list-item-title>Hide Sidebar</v-list-item-title>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <div
        v-show="!mini"
        class="flex justify-center items-center flex-col my-4"
      >
        <img class="avatar-expanded" :src="getAvatar" alt="User Avatar"/>
        <p class="font-bold text-lg mt-4 user-name">{{ getName }}</p>
        <v-btn
          class="mb-4"
          @click="redirectToCreateCoursePage"
          width="80%"
          color="primary"
          depressed
        >
          <v-icon left> mdi-plus</v-icon>
          Add Course
        </v-btn>
      </div>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item link @click="redirectToHome">
        <v-list-item-icon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 10.8333H9.16667V2.5H2.5V10.8333ZM2.5 17.5H9.16667V12.5H2.5V17.5ZM10.8333 17.5H17.5V9.16667H10.8333V17.5ZM10.8333 2.5V7.5H17.5V2.5H10.8333Z"
              fill="#0F0F0F"
              fill-opacity="0.87"
            />
          </svg>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in courses"
          :key="child.id"
          link
          @click="redirectToCoursePage(child.courseId)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item link class="mt-auto">
        <v-list-item-icon>
          <v-icon>mdi-settings</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <div class="absolute bottom-7 w-11/12">
        <v-list-item link @click="logout" class="logout">
          <v-list-item-icon v-show="mini">
            <v-icon color="error">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-btn width="90%" class="mx-auto" color="error" depressed v-if="!mini">
            <v-icon left> mdi-logout</v-icon>
            Logout
          </v-btn>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import api from "../../api/view";

export default {
  name: "Sidebar",
  data() {
    return {
      mini: true,
      expansionValue: null,
      drawer: true,
      items: [
        {
          action: "mdi-google-classroom",
          active: false,
          title: "Course",
        },
      ],
      courses: [],
    };
  },
  computed: {
    getName() {
      return this.$store.state.user.name;
    },
    getAvatar() {
      return this.$store.state.user.avatar;
    },
  },
  methods: {
    hideSidebar() {
      this.mini = true;
    },
    redirectToCreateCoursePage() {
      this.$inertia.visit("/course/create");
    },
    redirectToHome() {
      this.$inertia.visit("/");
    },
    redirectToCoursePage(id) {
      this.$inertia.visit("/course/" + id);
    },
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$inertia.visit("/login");
    },
    async getData() {
      try {
        const res = await api.view();
        this.courses = res.data;
      } catch (e) {
        this.$store.dispatch("OPEN_SNACKBAR", "Failed getting courses data");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.sidebar-item {
  padding: 0 !important;
  margin: 0 !important;
}

.sidebar-item-icon {
  max-width: 24px;
}

.sidebar-item-active button {
  min-height: 48px !important;
}

.avatar-expanded {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.nav-drawer {
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.1);
}
</style>
