const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const publicImagesDir = path.join(__dirname, '../../../../public/images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

const sourceImagesDir = path.join(__dirname, '../../../../src/assets/images');
const templateImages = [
    'banner_1.jpg', 'banner_2.jpg', 'banner_3.jpg',
    'slider_1.jpg', 'slider_2.jpg', 'slider_3.jpg'
];

async function run() {
    console.log("Đang sao chép ảnh có sẵn sang thư mục Local Public...");
    let localPaths = [];
    
    for (let i = 0; i < templateImages.length; i++) {
        let src = path.join(sourceImagesDir, templateImages[i]);
        let dest = path.join(publicImagesDir, `product_mock_${i}.jpg`);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            localPaths.push(`/images/product_mock_${i}.jpg`);
        }
    }

    console.log("Đã copy xong. Đang cập nhật Database bằng ảnh Local 100%...");
    let products = await Product.find({});
    for (let i = 0; i < products.length; i++) {
        products[i].imagePath = localPaths[i % localPaths.length];
        await products[i].save();
    }
    
    console.log("Cập nhật Database thành công 100% bằng Local Images!");
    process.exit();
}

run();
