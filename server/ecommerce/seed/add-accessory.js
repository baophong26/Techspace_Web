var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

async function addAccessory() {
    let acc1 = new Product({
      _id: "8cedf31cc14d7822b39d9d99",
      imagePath: 'https://static.zara.net/photos///2020/I/0/3/p/3183/700/800/2/w/560/3183700800_1_1_1.jpg?ts=1597336424462',
      title: 'Túi Da Phụ Kiện',
      description: 'Túi da lộn sành điệu, kết hợp hoàn hảo với đầm dạ hội.',
      price: 850000,
      color: 'Đen',
      size: 'Freesize',
      quantity: 50,
      department: 'Accessories',
      category: 'Túi Xách',
      date: Date.now()
    });
    
    let acc2 = new Product({
      _id: "8cedf31cc14d7822b39d9d98",
      imagePath: 'https://static.zara.net/photos///2018/I/0/2/p/3548/350/700/2/c-192-0-2048-3072/w/1920/3548350700_2_1_1.jpg?ts=1528819649601',
      title: 'Thắt Lưng Da Bò',
      description: 'Thắt lưng nam làm từ da bò thật 100%.',
      price: 320000,
      color: 'Nâu thẫm',
      size: 'Freesize',
      quantity: 120,
      department: 'Accessories',
      category: 'Dây Nịt',
      date: Date.now()
    });

    await acc1.save();
    await acc2.save();
    console.log("Đã nạp thêm Phụ Kiện thành công!");
    process.exit();
}
addAccessory();
