const mongoose = require('mongoose');
const Department = require('../models/Department');
const Category = require('../models/Category');
const dbURL = require('../configs/mongo-config');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB for Departments!'))
  .catch(err => console.log(err));

const departments = [
  { departmentName: "Laptops", categories: "MacBook,Dell,Asus,HP,Lenovo" },
  { departmentName: "Phones", categories: "iPhone,Samsung,Xiaomi,Oppo" },
  { departmentName: "Audio", categories: "Headphones,Earbuds,Speakers,Wearables" }
];

const categories = [
  { categoryName: "MacBook" }, { categoryName: "Dell" }, { categoryName: "Asus" },
  { categoryName: "HP" }, { categoryName: "Lenovo" },
  { categoryName: "iPhone" }, { categoryName: "Samsung" }, { categoryName: "Xiaomi" },
  { categoryName: "Oppo" },
  { categoryName: "Headphones" }, { categoryName: "Earbuds" }, { categoryName: "Speakers" }, { categoryName: "Wearables" }
];

const seedDB = async () => {
  try {
    if (Department && Department.deleteMany) await Department.deleteMany({});
    if (Category && Category.deleteMany) await Category.deleteMany({});
    console.log('Old departments & categories deleted.');

    await Department.insertMany(departments);
    if(Category && Category.insertMany) await Category.insertMany(categories);
    
    console.log('Tech departments seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding departments:', error);
    mongoose.disconnect();
  }
};

seedDB();
