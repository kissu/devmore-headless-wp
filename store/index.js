export const state = () => ({
  posts: [],
});

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts;
  },
};

export const actions = {
  //Dispatch on nuxt generate
  async nuxtServerInit({ commit, state }) {
    if (state.posts.length) return;
    try {
      const posts = (
        await this.$axios.$get("http://localhost/devmore/wp-json/wp/v2/posts")
      )
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
      commit("updatePosts", posts);
    } catch (err) {
      console.log(err);
    }
  },
};