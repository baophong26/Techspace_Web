const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', '..', 'public', 'images', 'products');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const queries = {
  MacBook: 'macbook',
  Dell: 'dellxps',
  Asus: 'asusrog',
  iPhone: 'iphone',
  Samsung: 'samsunggalaxy',
  Xiaomi: 'xiaomi,phone',
  Headphones: 'headphones,sony',
  Earbuds: 'earbuds,airpods',
  Speakers: 'bluetoothspeaker'
};

async function run() {
  console.log('Downloading 54 curated local images...');
  let globalCounter = 0;
  
  for (const [brand, keyword] of Object.entries(queries)) {
    for (let i = 1; i <= 6; i++) {
      globalCounter++;
      const filename = `${brand.toLowerCase()}-${i}.jpg`;
      const dest = path.join(imgDir, filename);
      
      const url = `https://loremflickr.com/800/800/${encodeURIComponent(keyword)}/all?lock=${globalCounter}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(dest, buffer);
        console.log(`Downloaded: ${filename}`);
      } catch (err) {
        console.log(`Failed for ${filename}: ${err.message}`);
      }
    }
  }
  console.log('Finished downloading exactly 54 structured images!');
}

run();
