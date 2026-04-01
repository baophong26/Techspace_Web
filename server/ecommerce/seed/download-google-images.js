const fs = require('fs');
const path = require('path');
const google = require('googlethis');
const axios = require('axios');

const imgDir = path.join(__dirname, '..', '..', 'public', 'images', 'products');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const premiumData = {
  Laptops: {
    MacBook: ["MacBook Pro M3 Max 16-inch", "MacBook Pro M3 Pro 14-inch", "MacBook Air M3 15-inch", "MacBook Air M3 13-inch", "MacBook Pro M2 13-inch", "MacBook Air M1 13-inch"],
    Dell: ["Dell XPS 15 9530 OLED", "Dell XPS 13 Plus 9320", "Dell Alienware m18 R2 Gaming", "Dell Alienware x14 R2", "Dell Inspiron 16 5630", "Dell Latitude 9440 2-in-1"],
    Asus: ["Asus ROG Strix SCAR 18", "Asus Zephyrus G14 OLED 2024", "Asus Zenbook 14X OLED", "Asus TUF Gaming F15", "Asus Vivobook Pro 15 OLED", "Asus ExpertBook B9"]
  },
  Phones: {
    iPhone: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15", "iPhone 14 Pro Max", "iPhone 13"],
    Samsung: ["Galaxy S24 Ultra", "Galaxy Z Fold 5", "Galaxy Z Flip 5", "Galaxy S24 Plus", "Galaxy S23 FE", "Galaxy A55 5G"],
    Oppo: ["Oppo Find N3 Fold", "Oppo Find N3 Flip", "Oppo Reno 11 Pro 5G", "Oppo Reno 11 5G", "Oppo A98 5G", "Oppo A79 5G"]
  },
  Audio: {
    Headphones: ["Sony WH-1000XM5", "Bose QuietComfort Ultra", "Sennheiser Momentum 4", "Apple AirPods Max", "Marshall Major IV", "Beats Studio Pro"],
    Earbuds: ["AirPods Pro 2 USB-C", "Sony WF-1000XM5", "Samsung Galaxy Buds 2 Pro", "Bose QuietComfort Earbuds II", "Jabra Elite 10", "Sennheiser Momentum True Wireless 3"],
    Speakers: ["Marshall Stanmore III", "JBL PartyBox 310", "Harmon Kardon Aura Studio 4", "JBL Flip 6", "Sony SRS-XV800", "Bose SoundLink Revolve+ II"]
  }
};

async function downloadImage(url, dest) {
  const writer = fs.createWriteStream(dest);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    timeout: 8000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64;'
    }
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function run() {
  console.log("Starting batch download of EXACT Google Images...");
  let count = 0;
  for (const [dept, categories] of Object.entries(premiumData)) {
    for (const [brand, products] of Object.entries(categories)) {
      for (let i = 0; i < products.length; i++) {
        const prodName = products[i];
        const filename = `${brand.toLowerCase()}-${i+1}.jpg`;
        const dest = path.join(imgDir, filename);
        
        if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
          console.log(`Assuming OK: ${filename}`);
          continue; // skip if already downloaded completely
        }

        try {
          const query = `${prodName} product render pure white background`;
          const images = await google.image(query, { safe: false });
          let success = false;
          for (let j = 0; j < Math.min(5, images.length); j++) {
            try {
              if (images[j].url.endsWith('svg') || images[j].url.includes('svg')) continue; // Skip vectors
              await downloadImage(images[j].url, dest);
              console.log(`Success: ${filename} (${prodName})`);
              success = true;
              break;
            } catch (dlErr) {
               // Try next image
            }
          }
          if (!success) console.log(`CRITICAL FAIL: ${filename}`);
        } catch(e) { console.log(`Error searching ${filename}: ${e.message}`); }
      }
    }
  }
  console.log("Download complete!");
}

run();
