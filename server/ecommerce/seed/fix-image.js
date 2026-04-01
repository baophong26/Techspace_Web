var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

async function fixImage() {
    let p = await Product.findById("5bedf55bc14d7822b39d9d4b");
    if (p) {
        // Replace with a standard Unsplash placeholder image of a blazer
        p.imagePath = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        await p.save();
    }
    
    // As a backup, let's fix any other potentially dead ZARA links that might break later
    let p2 = await Product.findById("5bedf448c14d7822b39d9d47");
    if (p2 && p2.title.includes("Áo Kiểu")) {
        // Fallback for Basic Top
        p2.imagePath = 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        await p2.save();
    }
    
    console.log("Đã sửa ảnh bị hỏng thành công!");
    process.exit();
}
fixImage();
