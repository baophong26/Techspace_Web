const { image_search } = require('duckduckgo-images-api');

async function test() {
  try {
    const results = await image_search({ query: "iPhone 15 Pro Max product render", moderate: true, iterations: 1 });
    console.log("Results found:", results.length);
    if (results.length > 0) {
      console.log("Top 3 images:");
      console.log(results[0].image);
      console.log(results[1].image);
      console.log(results[2].image);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
