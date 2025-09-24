module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy(
    "./src/assets/fonts/manrope-v20-latin-500.woff2"
  );
  eleventyConfig.addPassthroughCopy(
    "./src/assets/fonts/manrope-v20-latin-700.woff2"
  );
  eleventyConfig.addPassthroughCopy(
    "./src/assets/fonts/manrope-v20-latin-regular.woff2"
  );
};
