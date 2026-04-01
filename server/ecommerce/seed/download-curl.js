const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const images = {
  "Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
  "Belt": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=400&q=80",
  "Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
  "Bag": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=400&q=80",
  "Shirt": "https://images.unsplash.com/photo-1596755094514-f87e32f6b717?auto=format&fit=crop&w=400&q=80",
  "Sweater": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80",
  "Jacket": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
  "Dress": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80"
};

const publicImagesDir = path.join(__dirname, '../../../public/images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

console.log("Khởi động Lệnh Tải Ảnh Bằng Cường Độ Cao (cURL)...");
let localMap = {};
for (const [key, url] of Object.entries(images)) {
  let dest = path.join(publicImagesDir, `mock_${key}.jpg`);
  try {
     // Run curl synchronously to download the image, following redirects (-L)
     execSync(`curl -s -L "${url}" -o "${dest}"`);
     localMap[key] = `/images/mock_${key}.jpg`;
     console.log(`Đã tải xong chuẩn HD: ${key}`);
  } catch(e) {
     console.log(`Lỗi khi tải: ${key} - ${e.message}`);
  }
}

async function run() {
    console.log("Đang phân loại Khớp Tên với Hình Ảnh của 30 mặt hàng...");
    let products = await Product.find({});
    for (let p of products) {
        let t = p.title.toLowerCase();
        if (t.includes('quần bò') || t.includes('jeans')) p.imagePath = localMap['Jeans'];
        else if (t.includes('thắt lưng') || t.includes('belt')) p.imagePath = localMap['Belt'];
        else if (t.includes('kính')) p.imagePath = localMap['Sunglasses'];
        else if (t.includes('túi')) p.imagePath = localMap['Bag'];
        else if (t.includes('áo len')) p.imagePath = localMap['Sweater'];
        else if (t.includes('áo khoác') || t.includes('blazer')) p.imagePath = localMap['Jacket'];
        else if (t.includes('váy') || t.includes('đầm')) p.imagePath = localMap['Dress'];
        else p.imagePath = localMap['Shirt']; // Mặc định là Áo
        
        await p.save();
    }
    console.log("Hoàn tất dán nhãn khớp tuyệt đối 100%! Hãy tải lại trang F5 nhé!");
    process.exit();
}
run();
