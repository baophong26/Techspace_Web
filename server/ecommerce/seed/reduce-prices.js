const mongoose = require('mongoose');
const mongoConfig = require('../configs/mongo-config');
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(mongoConfig, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB for price update...");
    const products = await Product.find({});
    
    let updatedCount = 0;
    for (let p of products) {
      if (p.price) {
        // Lower price by 15% to match street/market value
        let newPrice = Math.floor(p.price * 0.85);
        
        // Round to nearest 10,000 for realistic VNĐ pricing
        newPrice = Math.round(newPrice / 10000) * 10000;
        
        p.price = newPrice;
        await p.save();
        updatedCount++;
      }
    }
    
    console.log(`Successfully reduced prices for ${updatedCount} products!`);
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
