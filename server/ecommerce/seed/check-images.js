const mongoose = require('mongoose');
const mongoConfig = require('../configs/mongo-config');
const Product = require('../models/Product');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const products = await Product.find({ department: 'Laptops' });
    products.forEach(p => console.log(`[${p.title}] -> ${p.imagePath}`));
    
    // Also check Phones and Audio
    const phones = await Product.find({ department: 'Phones' });
    phones.slice(0, 3).forEach(p => console.log(`[${p.title}] -> ${p.imagePath}`));
    
    process.exit(0);
  });
