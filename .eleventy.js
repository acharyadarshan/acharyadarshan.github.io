module.exports = function (eleventyConfig) {
  // Date filter for templates
  eleventyConfig.addFilter("dateFormat", function (date, format) {
    const d = new Date(date);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    if (format === "monthYear") {
      return `${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/data");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/google9b6db348e255be16.html");

  // Blog collection sorted by date descending
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Papers collection — grouped by week, sorted by order within each week
  eleventyConfig.addCollection("papers", function (collectionApi) {
    const weekOrder = {};
    let weekIndex = 0;
    return collectionApi
      .getFilteredByGlob("src/papers/*.md")
      .sort((a, b) => {
        const weekA = a.data.week || "Undated";
        const weekB = b.data.week || "Undated";
        if (!(weekA in weekOrder)) weekOrder[weekA] = weekIndex++;
        if (!(weekB in weekOrder)) weekOrder[weekB] = weekIndex++;
        if (weekOrder[weekA] !== weekOrder[weekB]) {
          return weekOrder[weekA] - weekOrder[weekB];
        }
        return (a.data.order || 0) - (b.data.order || 0);
      });
  });

  // Topics collection — grouped by category, sorted by order within each category
  eleventyConfig.addCollection("topics", function (collectionApi) {
    const catOrder = { "Mathy Notes": 0, "More Empirics-Centered Notes": 1, "Other Notes (PDFs)": 2 };
    return collectionApi
      .getFilteredByGlob("src/topics/*.md")
      .sort((a, b) => {
        const catA = catOrder[a.data.category] ?? 99;
        const catB = catOrder[b.data.category] ?? 99;
        if (catA !== catB) return catA - catB;
        return (a.data.order || 0) - (b.data.order || 0);
      });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
