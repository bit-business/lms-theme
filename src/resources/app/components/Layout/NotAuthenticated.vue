<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "NotAuthenticated",
  beforeCreate() {
    if (this.$store.state.isAuthenticated) {
      this.$inertia.visit("/");
    }
  },
};
</script>
