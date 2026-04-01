const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const images = {
  "LongSleeve": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "TankTop": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
};

const publicImagesDir = path.join(__dirname, '../../../public/images');

console.log("Đang tải ảnh Áo dài tay và Áo Tank Top...");
let localMap = {};
for (const [key, url] of Object.entries(images)) {
  let dest = path.join(publicImagesDir, `mock_${key}.jpg`);
  try {
     execSync(`curl -s -L "${url}" -o "${dest}"`);
     localMap[key] = `/images/mock_${key}.jpg`;
     console.log(`Đã tải: ${key}`);
  } catch(e) {
     console.log(`Lỗi tải: ${key} - ${e.message}`);
  }
}

async function run() {
    let products = await Product.find({});
    for (let p of products) {
        let t = p.title.toLowerCase();
        if (t.includes('dài tay')) {
            p.imagePath = localMap['LongSleeve'];
            await p.save();
        } else if (t.includes('tank')) {
            p.imagePath = localMap['TankTop'];
            await p.save();
        }
    }
    console.log("Hoàn tất gắn ảnh Áo Dài Tay và Áo Tank Top!");
    process.exit();
}
run();
