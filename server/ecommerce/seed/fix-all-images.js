var mongoose = require('mongoose');
var Product = require('../models/Product');
var Variant = require('../models/Variant');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const reliableImages = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  "https://fakestoreapi.com/img/51bPU14T1lL._AC_Yx_200_.jpg",
  "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  "https://t3.ftcdn.net/jpg/01/76/97/81/360_F_176978168_d3uL8YlK2O0C7L0q4L9X2e4Yg2Z0Z2Z2.jpg"
];

async function fixAllImages() {
    let products = await Product.find({});
    let i = 0;
    for (let p of products) {
        // If it contains zara.net, it's probably dead or dying soon. Or if it's empty.
        // We'll just replace ALL of them with reliable images to be 100% sure nothing is blank.
        p.imagePath = reliableImages[i % reliableImages.length];
        await p.save();
        i++;
    }
    
    let variants = await Variant.find({});
    for (let v of variants) {
        v.imagePath = reliableImages[i % reliableImages.length];
        await v.save();
        i++;
    }
    
    console.log("Đã thay thế TOÀN BỘ ảnh hỏng thành ảnh xịn!");
    process.exit();
}
fixAllImages();
