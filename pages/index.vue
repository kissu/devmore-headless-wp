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
            : 'Hur kan ni optimera ert företag?'
        "
        :key="image.id"
        :img-src="image.media_details.sizes.full.source_url"
        style="height: 85vh"
        v-for="(image, index) in heroImages"
      />
    </b-carousel>
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
};
</script>
