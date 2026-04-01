const fs = require('fs');
const path = require('path');
const google = require('googlethis');
const axios = require('axios');

const dest = "d:/newProject/fashion-cube/public/images/products/macbook-1.jpg";

async function downloadImage(url, destPath) {
  const writer = fs.createWriteStream(destPath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    timeout: 8000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64;' }
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function run() {
  if (fs.existsSync(dest)) fs.unlinkSync(dest); // Delete the stale image
  console.log("Fetching pristine Apple MacBook Pro M3 Max render...");
  
  try {
    const images = await google.image("MacBook Pro M3 Max 16-inch product render white background", { safe: false });
    for (let j = 0; j < Math.min(5, images.length); j++) {
      try {
        if (!images[j].url.includes('svg')) {
          await downloadImage(images[j].url, dest);
          console.log(`Success! Overwrote macbook-1.jpg with a modern professional render.`);
          break;
        }
      } catch (e) {}
    }
  } catch(e) { console.log(e.message); }
}

run();
