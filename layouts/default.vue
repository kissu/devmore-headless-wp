<template>
  <div>
    <b-navbar sticky toggleable="lg" type="light" variant="light">
      <b-navbar-brand style="font-size: 1.65rem" to="/">Devmore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            :key="item.slug"
            :to="item.slug"
            v-for="item in menuItems"
          >
            {{ item.title }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: {},
    };
  },
  async fetch() {
    this.menuItems = (
      await this.$axios.$get("http://localhost/devmore/wp-json/wp/v2/pages")
    )
      .filter((item) => item.slug !== "start")
      .map((item) => {
        return {
          slug: item.slug,
          title: item.title.rendered,
        };
      });
  },
};
</script>
