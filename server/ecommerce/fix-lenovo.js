const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fashion-cube', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const Product = require('./models/product');
    const legion = await Product.findOne({ title: /Lenovo Legion Pro 7i/i });
    if (legion) {
      legion.imagePath = 'https://images.unsplash.com/photo-1517336714810-c020cbdef41b?w=800&q=80'; // a nice gaming laptop image
      await legion.save();
      console.log('Restored Legion:', legion.imagePath);
    }
    
    const p = await Product.findOne({ title: /Lenovo IdeaPad Slim 7/i });
    if (p) {
      console.log('Found:', p.title, p.imagePath);
      // Let's use an actual image of Lenovo IdeaPad Slim 7 (grey slim laptop)
      p.imagePath = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'; // an XPS/slim style
      await p.save();
      console.log('Fixed Slim 7:', p.imagePath);
    } else {
      console.log('Slim 7 Not found');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
