import store from "./store/store";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import vuetify from "../../plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import {
  createInertiaApp,
  plugin as InertiaPlugin,
} from "@inertiajs/inertia-vue";
import { Inertia } from "@inertiajs/inertia";

Vue.use(Vuetify);
Vue.use(InertiaPlugin);

createInertiaApp({
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, App, props, plugin }) {
    Vue.use(plugin);

    new Vue({
      store,
      vuetify,
      render: (h) => h(App, props),
    }).$mount(el);
  },
});

Inertia.on("navigate", (event) => {
  if (!["/login", "/register"].includes(event?.detail?.page?.url)) {
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
  }
});
