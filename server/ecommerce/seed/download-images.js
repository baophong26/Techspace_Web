const fs = require('fs');
const https = require('https');
const path = require('path');
var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const publicImagesDir = path.join(__dirname, '../../../../public/images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

// 5 local images we will download.
const imagesToDownload = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
};

async function run() {
    console.log("Đang tải ảnh về máy cục bộ (Local)...");
    let downloadedPaths = [];
    for (let i = 0; i < imagesToDownload.length; i++) {
        let dest = path.join(publicImagesDir, `product_${i}.jpg`);
        await downloadImage(imagesToDownload[i], dest);
        downloadedPaths.push(`/images/product_${i}.jpg`);
    }

    console.log("Đã tải xong 5 ảnh. Đang cập nhật Database...");
    let products = await Product.find({});
    for (let i = 0; i < products.length; i++) {
        products[i].imagePath = downloadedPaths[i % downloadedPaths.length];
        await products[i].save();
    }
    console.log("Cập nhật Database thành công 100% bằng Local Images!");
    process.exit();
}

run();
