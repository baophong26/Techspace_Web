const mongoose = require('mongoose');
const mongoConfig = require('../configs/mongo-config');
const Product = require('../models/Product');
const Variant = require('../models/Variant');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(async () => {
    let idxMac = 1, idxAsus = 1, idxDell = 1, idxIphone = 1, idxSamsung = 1, idxOppo = 1, idxHeadphones = 1, idxEarbuds = 1, idxSpeakers = 1;
    
    let products = await Product.find({});
    for (let p of products) {
        if (p.department === 'Laptops') {
            if (p.title.includes('MacBook')) { p.imagePath = `/images/products/macbook-${idxMac++}.jpg`; if(idxMac > 6) idxMac = 1; }
            else if (p.title.includes('Dell')) { p.imagePath = `/images/products/dell-${idxDell++}.jpg`; if(idxDell > 6) idxDell = 1; }
            else if (p.title.includes('Asus')) { p.imagePath = `/images/products/asus-${idxAsus++}.jpg`; if(idxAsus > 6) idxAsus = 1; }
            else { p.imagePath = `/images/products/macbook-1.jpg`; }
        } else if (p.department === 'Phones') {
            if (p.title.includes('iPhone')) { p.imagePath = `/images/products/iphone-${idxIphone++}.jpg`; if(idxIphone > 6) idxIphone = 1; }
            else if (p.title.includes('Galaxy') || p.title.includes('Samsung')) { p.imagePath = `/images/products/samsung-${idxSamsung++}.jpg`; if(idxSamsung > 6) idxSamsung = 1; }
            else if (p.title.includes('Oppo')) { p.imagePath = `/images/products/oppo-${idxOppo++}.jpg`; if(idxOppo > 6) idxOppo = 1; }
            else { p.imagePath = `/images/products/iphone-1.jpg`; }
        } else if (p.department === 'Audio') {
            let t = p.title;
            if (t.includes('WH-') || t.includes('Max') || t.includes('Major') || t.includes('Studio Pro') || t.includes('QuietComfort Ultra') || t.includes('Momentum 4')) {
               p.imagePath = `/images/products/headphones-${idxHeadphones++}.jpg`; if(idxHeadphones > 6) idxHeadphones = 1;
            } else if (t.includes('Earbuds') || t.includes('Buds') || t.includes('WF-') || t.includes('Pro 2') || t.includes('True Wireless') || t.includes('Elite 10')) {
               p.imagePath = `/images/products/earbuds-${idxEarbuds++}.jpg`; if(idxEarbuds > 6) idxEarbuds = 1;
            } else {
               p.imagePath = `/images/products/speakers-${idxSpeakers++}.jpg`; if(idxSpeakers > 6) idxSpeakers = 1;
            }
        }
        await p.save();
    }
    
    // update variants
    let variants = await Variant.find({});
    for (let v of variants) {
        let parent = products.find(p => p._id.toString() == v.productId);
        if(parent && parent.imagePath) { v.imagePath = parent.imagePath; await v.save(); }
    }
    
    console.log("Successfully reverted to local images!");
    process.exit(0);
});
