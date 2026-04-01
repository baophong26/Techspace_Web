const mongoose = require('mongoose');
const Product = require('../models/Product');
const dbURL = require('../configs/mongo-config');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log(err));

const techProducts = [
  {
    imagePath: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    title: "MacBook Pro M3 Max",
    description: "Laptop cao cấp với chip M3 Max 16-core CPU, 40-core GPU, 48GB RAM, 1TB SSD. Siêu mỏng nhẹ và mạnh mẽ.",
    department: "Laptops",
    category: "MacBook",
    price: 89900000,
    color: "Space Black",
    size: "16-inch",
    quantity: 15,
    date: Date.now()
  },
  {
    imagePath: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    title: "iPhone 15 Pro Max",
    description: "Điện thoại Apple iPhone 15 Pro Max Titan tự nhiên cực bền. Chip A17 Pro siêu phân giải.",
    department: "Phones",
    category: "iPhone",
    price: 34990000,
    color: "Titan",
    size: "256GB",
    quantity: 50,
    date: Date.now() - 10000
  },
  {
    imagePath: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    title: "Sony WH-1000XM5",
    description: "Tai nghe chống ồn chủ động không dây. Âm thanh Hi-Res, pin 30 giờ, công nghệ đỉnh cao.",
    department: "Audio",
    category: "Headphones",
    price: 7990000,
    color: "Black",
    size: "Freesize",
    quantity: 100,
    date: Date.now() - 20000
  },
  {
    imagePath: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    title: "Apple Watch Series 9",
    description: "Đồng hồ thông minh theo dõi sức khỏe, viền nhôm dây cao su. Màn hình Retina sáng rực rỡ.",
    department: "Audio",
    category: "Wearables",
    price: 10490000,
    color: "Pink",
    size: "41mm",
    quantity: 20,
    date: Date.now() - 30000
  },
  {
    imagePath: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
    title: "iPad Pro 11-inch M2",
    description: "Máy tính bảng iPad Pro với sức mạnh chip M2, màn hình Liquid Retina cực sắc nét.",
    department: "Laptops", 
    category: "MacBook",   
    price: 22990000,
    color: "Silver",
    size: "128GB",
    quantity: 30,
    date: Date.now() - 40000
  },
  {
    imagePath: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
    title: "PS5 DualSense Controller",
    description: "Tay cầm chơi game thế hệ mới với Haptic Feedback tiên tiến mang lại cảm giác chân thực.",
    department: "Audio", 
    category: "Speakers",
    price: 1890000,
    color: "White",
    size: "Standard",
    quantity: 200,
    date: Date.now() - 50000
  },
  {
    imagePath: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    title: "Keychron Q1 Custom Keyboard",
    description: "Bàn phím cơ Custom cao cấp vỏ nhôm nguyên khối, Gasket Mount, gõ cực êm.",
    department: "Laptops",
    category: "Dell",
    price: 4500000,
    color: "Navy Blue",
    size: "75%",
    quantity: 25,
    date: Date.now() - 60000
  },
  {
    imagePath: "https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=800",
    title: "Samsung Galaxy S24 Ultra",
    description: "Điện thoại AI cao cấp nhất với bút S Pen, camera 200MP siêu zoom bá đạo.",
    department: "Phones",
    category: "Samsung",
    price: 33990000,
    color: "Titanium Gray",
    size: "256GB",
    quantity: 40,
    date: Date.now() - 70000
  }
];

const seedDB = async () => {
  try {
    console.log('Clearing old fashion products...');
    await Product.deleteMany({});
    console.log('Old products deleted.');

    console.log('Seeding new tech products...');
    await Product.insertMany(techProducts);
    console.log('Tech products seeded successfully!');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
};

seedDB();
