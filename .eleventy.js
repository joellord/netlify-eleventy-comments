module.exports = function (eleventyConfig) {

  eleventyConfig.addCollection("posts", (collection) => {
      return collection
          .getFilteredByGlob("src/blog/**/*.md");
  });

  eleventyConfig.addFilter("getCommentsForUrl", (comments, url) => {
      let filtered = comments.filter(entry => entry["url"] === url);
      return filtered;
  });

  return {
      dir: { input: "src", output: "public" }
  };

};
