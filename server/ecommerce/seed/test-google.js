const google = require('googlethis');

async function test() {
  const images = await google.image('iPhone 15 Pro Max white background', { safe: false });
  console.log("Found:", images.length);
  if (images.length > 0) {
    console.log("Top 3:");
    console.log(images[0].url);
    console.log(images[1].url);
    console.log(images[2].url);
  }
}
test();
