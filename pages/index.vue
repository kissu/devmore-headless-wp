<template>
  <div>
    <!-- Header -->
    <b-carousel
      controls
      fade
      id="carousel-fade"
      indicators
      label-goto-slide="Gå till slide"
      label-indicators="Välj en slide att visa"
      label-next="Nästa slide"
      label-prev="Föregående slide"
      style="text-shadow: 0px 0px 2px #000"
    >
      <b-carousel-slide
        :caption="
          index === 0
            ? 'Skräddarsydda IT-lösningar'
            : index === 1
            ? 'Vi skräddarsyr det optimala systemet för just ert företag'
            : 'Hur vill ni optimera ert företag?'
        "
        :key="image.id"
        :img-src="image.media_details.sizes.full.source_url"
        style="height: 85vh"
        v-for="(image, index) in heroImages"
      />
    </b-carousel>

    <main>
      <!-- Page content -->
      <section class="page-content text-center">
        <div class="mb-5" v-html="page.content.rendered" />
        <b-button variant="info">Mer om oss</b-button>
      </section>

      <!-- Latest blogposts -->
      <section class="text-center">
        <h2>Senaste blogginläggen</h2>
        <div class="posts-container">
          <b-card
            class="post-card mx-3"
            :header="`${new Date(post.date).toLocaleDateString(
              'sv-SE'
            )} | ${new Date(post.date)
              .toLocaleTimeString('sv-SE')
              .slice(0, -3)}`"
            header-tag="time"
            :img-alt="
              images.find((el) => el.id === post.featured_media).alt_text
            "
            :img-src="
              images.find((el) => el.id === post.featured_media).media_details
                .sizes.medium.source_url
            "
            img-top
            :key="post.id"
            tag="article"
            :title="post.title.rendered"
            v-for="post in recentPosts"
          >
            <p class="mb-3">
              <span class="tag" :key="tag" v-for="tag in post.tags">
                {{ tags.find((el) => el.id === tag).name }}
              </span>
            </p>
            <div class="text-left" v-html="post.excerpt.rendered" />
            <b-button :to="`/blogg/${post.slug}`" variant="info">
              Läs mer
            </b-button>
          </b-card>
        </div>

        <b-button class="mt-5" to="/blogg" variant="dark">
          Visa alla blogginlägg
        </b-button>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const heroImages = (
      await $axios.$get("http://localhost/devmore/wp-json/wp/v2/media")
    ).filter(
      (item) =>
        item.slug === "devmore" ||
        item.slug === "devmore1" ||
        item.slug === "devmore2"
    );
    return { heroImages };
  },
  computed: {
    images() {
      return this.$store.state.media;
    },
    page() {
      return this.$store.state.pages.find((el) => el.slug === "start");
    },
    recentPosts() {
      return this.$store.state.posts.slice(0, 3);
    },
    tags() {
      return this.$store.state.tags;
    },
  },
};
</script>
<style scoped>
.page-content {
  margin: auto;
  max-width: 60rem;
}

.posts-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.post-card {
  max-width: 20rem;
}

.post-card > img {
  object-fit: cover;
  width: 100%;
  height: 10rem;
}

/* Customize Bootstrap Vue class */
.card-header {
  font-size: 0.9rem;
  padding: 0;
  margin: 1rem 0 -1rem;
  background-color: #fff;
  border-bottom: none;
}

.tag {
  font-size: 0.9em;
  font-style: italic;
  font-weight: 500;
  color: #6c757d;
}
@media (max-width: 1200px) {
  .posts-container {
    align-items: center;
    flex-direction: column;
  }

  .post-card {
    max-width: 40rem;
    margin-bottom: 4rem;
  }

  .post-card > img {
    height: 100%;
  }
}
</style>
