const path = require("node:path");
const sass = require("sass");
const markdownIt = require("markdown-it");
const MarkdownIt = require("markdown-it");

module.exports = (config) => {
  // add SCSS template format
  config.addTemplateFormats("scss");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/assets");
  config.addPassthroughCopy("./src/main.js");

  config.addCollection("products", (collection) => {
    const myData = collection.getAll()[0].data.data;
    myData.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
    return myData;
  });

  // Configure SCSS files
  config.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => {
        return result.css;
      };
    },
  });

  config.addFilter("commaize", function (num) {
    return num.toLocaleString("en-us"); // Use "en-us" for comma separators
  });

  const md = new MarkdownIt({
    html: true,
  });

  config.addFilter("markdown", (content) => {
    return md.render(content);
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
