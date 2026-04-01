const mongoose = require('mongoose');
const Product = require('../models/Product');
const dbURL = require('../configs/mongo-config');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const p = await Product.findOne({});
    console.log("Random product imagePath:");
    console.log(p.imagePath);
    process.exit(0);
  });
