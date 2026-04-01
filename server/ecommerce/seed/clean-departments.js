const mongoose = require('mongoose');
const Department = require('../models/Department');
const dbURL = require('../configs/mongo-config');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log(err));

const newDepartments = [
  {
    departmentName: "Laptops",
    categories: "MacBook,Dell,Asus"
  },
  {
    departmentName: "Phones",
    categories: "iPhone,Samsung,Xiaomi"
  },
  {
    departmentName: "Audio",
    categories: "Headphones,Earbuds,Speakers"
  }
];

const runCleanDepartments = async () => {
  try {
    console.log('Clearing old departments...');
    await Department.deleteMany({});
    console.log('Inserting 3 premium departments...');
    await Department.insertMany(newDepartments);
    console.log('Departments aligned successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

runCleanDepartments();
