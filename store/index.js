export const state = () => ({
  pages: [],
  posts: [],
});

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages;
  },
  updatePosts: (state, posts) => {
    state.posts = posts;
  },
};

export const actions = {
  //Dispatch on nuxt generate
  async nuxtServerInit({ commit, state }) {
    if (state.posts.length) return;
    try {
      const [pages, posts] = await Promise.all([
        this.$axios.$get("http://localhost/devmore/wp-json/wp/v2/pages"),
        this.$axios.$get("http://localhost/devmore/wp-json/wp/v2/posts"),
      ]);

      posts
        .filter((el) => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content,
        }));

      pages.map(({ id, slug, title, date, tags, content }) => ({
        id,
        slug,
        title,
        date,
        tags,
        content,
      }));
      commit("updatePages", pages);
      commit("updatePosts", posts);
    } catch (err) {
      console.log(err);
    }
  },
};
