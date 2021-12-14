<template>
  <main>
    <b-breadcrumb :items="items" />
    <article class="text-center blog-post mb-5">
      <time>
        {{ new Date(post.date).toLocaleDateString("sv-SE") }} |
        {{ new Date(post.date).toLocaleTimeString("sv-SE").slice(0, -3) }}
      </time>
      <h1>{{ post.title.rendered }}</h1>
      <b-badge class="tag mr-2 mb-2" :key="tag" v-for="tag in post.tags">
        {{ tags.find((el) => el.id === tag).name }}
      </b-badge>
      <div class="post-content mb-5 text-left" v-html="post.content.rendered" />
      <b-button
        @click="toPreviousPost"
        :disabled="posts.indexOf(post) === 0"
        size="sm"
      >
        Föregående
      </b-button>
      <b-button
        @click="toNextPost"
        :disabled="posts.indexOf(post) === posts.length - 1"
        size="sm"
      >
        Nästa
      </b-button>
    </article>
  </main>
</template>

<script>
export default {
  computed: {
    images() {
      return this.$store.state.media;
    },
    items() {
      return [
        {
          text: "Hem",
          to: "/",
        },
        {
          text: "Blogg",
          to: "/blogg",
        },
        {
          active: true,
          text: this.$store.state.posts.find((el) => el.slug === this.slug)
            .title.rendered,
        },
      ];
    },
    post() {
      return this.$store.state.posts.find((el) => el.slug === this.slug);
    },
    posts() {
      return this.$store.state.posts;
    },
    tags() {
      return this.$store.state.tags;
    },
  },
  data() {
    return {
      slug: this.$route.params.slug,
    };
  },
  methods: {
    toNextPost() {
      if (this.posts.indexOf(this.post) !== this.posts.length - 1) {
        this.$router.push(this.posts[this.posts.indexOf(this.post) + 1].slug);
      }
    },
    toPreviousPost() {
      if (this.posts.indexOf(this.post) !== 0) {
        this.$router.push(this.posts[this.posts.indexOf(this.post) - 1].slug);
      }
    },
  },
};
</script>

<style scoped>
.post-content {
  margin: auto;
  max-width: 60rem;
}

.blog-post >>> img {
  border: 2px solid #f8f9fa;
  box-shadow: 0.5px 0.5px 5px #6c757d;
  margin: 2rem auto;
}
</style>
