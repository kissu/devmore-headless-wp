<template>
  <article v-if="post">
    <time>
      {{ new Date(post.date).toLocaleDateString("sv-SE") }} |
      {{ new Date(post.date).toLocaleTimeString("sv-SE").slice(0, -3) }}
    </time>
    <h1>{{ post.title.rendered }}</h1>
    <p>{{ post.tags }}</p>
    <div v-html="post.content.rendered"></div>
  </article>
</template>

<script>
export default {
  computed: {
    post() {
      return this.$store.state.posts.find((el) => el.slug === this.slug);
    },
  },
  async created() {
    await this.$store.dispatch("getPosts");
  },
  data() {
    return {
      slug: this.$route.params.slug,
    };
  },
};
</script>
