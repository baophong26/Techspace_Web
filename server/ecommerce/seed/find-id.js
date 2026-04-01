const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/fashion-cube';

const productSchema = new mongoose.Schema({ name: String }, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function run() {
  await mongoose.connect(uri);
  const products = await Product.find().limit(5);
  products.forEach(p => console.log(p.name + " -> " + p._id));
  process.exit(0);
}
run();
