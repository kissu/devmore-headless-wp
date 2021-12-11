<template>
  <div>
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
        <div v-html="page.content.rendered" />
        <b-button variant="info">Mer om oss</b-button>
      </section>

      <!-- Latest blogposts -->
      <section class="text-center">
        <h2>Senaste blogginläggen</h2>
        <div class="posts-container">
          <b-card
            class="post-card mx-3"
            :title="post.title.rendered"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            :key="post.id"
            v-for="post in recentPosts"
          >
            <div v-html="post.excerpt.rendered" />
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
    page() {
      return this.$store.state.pages.find((el) => el.slug === "start");
    },
    recentPosts() {
      return this.$store.state.posts.slice(0, 3);
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

@media (max-width: 1200px) {
  .posts-container {
    align-items: center;
    flex-direction: column;
  }

  .post-card {
    max-width: 40rem;
    margin-bottom: 2rem;
  }
}
</style>
