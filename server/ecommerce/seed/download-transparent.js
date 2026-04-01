const fs = require('fs');
const https = require('https');
const axios = require('axios');

const dest = "d:/newProject/fashion-cube/public/images/products/macbook-transparent.png";

async function download() {
  try {
    const url = "https://pngimg.com/uploads/macbook/macbook_PNG8.png";
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const writer = fs.createWriteStream(dest);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log("Success! Downloaded transparent MacBook.");
    });
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

download();
