var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

async function fixImage2() {
    let p = await Product.findById("5bedf55bc14d7822b39d9d4b");
    if (p) {
        // Replace with the Orange Sweater image which we know works.
        p.imagePath = 'https://static.zara.net/photos///2018/I/0/2/p/1775/300/615/2/w/1920/1775300615_1_1_1.jpg?ts=1539690384503';
        p.title = 'Áo Khoác Nam Màu Cam';
        p.description = 'Áo khoác Blazer nam cao cấp, phong cách trẻ trung.';
        await p.save();
    }
    
    console.log("Đã sửa ảnh bằng link nội bộ Zara!");
    process.exit();
}
fixImage2();
