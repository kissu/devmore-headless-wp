<template>
  <div>
    <h1>Devmore</h1>
    <p>{{ pages[0] }}</p>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const pages = await $axios.$get(
      "http://localhost/devmore/wp-json/wp/v2/pages"
    );
    return { pages };
  },
};
</script>
