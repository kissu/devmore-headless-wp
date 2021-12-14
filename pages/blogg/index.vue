<template>
  <main>
    <b-breadcrumb :items="items" />
    <div class="filter text-center mb-5 p-3">
      <b-form-checkbox
        button-variant="info"
        class="mb-1 mr-1"
        :key="tag.id"
        v-for="tag in tags"
        button
        size="sm"
        :value="tag.id"
        v-model="activeTags"
      >
        {{ tag.name }}
      </b-form-checkbox>
    </div>
    <article class="text-center blog-post" :key="post.id" v-for="post in posts">
      <time>
        {{ new Date(post.date).toLocaleDateString("sv-SE") }} |
        {{ new Date(post.date).toLocaleTimeString("sv-SE").slice(0, -3) }}
      </time>
      <h1>{{ post.title.rendered }}</h1>
      <b-badge
        class="tag mr-2 mb-2"
        :key="tag"
        variant="light"
        v-for="tag in post.tags"
      >
        {{ tags.find((el) => el.id === tag).name }}
      </b-badge>
      <div
        class="border-bottom post-content pb-5 text-left"
        v-html="post.content.rendered"
      />
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
          active: true,
          text: "Blogg",
        },
      ];
    },
    posts() {
      if (!this.activeTags.length) {
        return this.$store.state.posts;
      } else {
        return this.$store.state.posts.filter((el) =>
          el.tags.some((tag) => this.activeTags.includes(tag))
        );
      }
    },
    tags() {
      return this.$store.state.tags;
    },
  },
  data() {
    return {
      activeTags: [],
    };
  },
};
</script>

<style scoped>
.filter >>> .btn-sm {
  padding: 0 0.5rem;
}

.blog-post {
  margin-bottom: 5rem;
}

.blog-post >>> img {
  border: 2px solid #f8f9fa;
  box-shadow: 0.5px 0.5px 5px #6c757d;
  margin: 2rem auto;
}

.post-content {
  margin: auto;
  max-width: 60rem;
}
</style>
