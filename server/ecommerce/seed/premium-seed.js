const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('../models/Product');
const Department = require('../models/Department');
const dbURL = require('../configs/mongo-config');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log(err));

// Note: Replaced 'Xiaomi' with 'Oppo' so that it perfectly matches DummyJSON's available brand images.
const premiumData = {
  Laptops: {
    MacBook: [
      { name: "MacBook Pro M3 Max 16-inch", desc: "Đỉnh cao hiệu năng với chip M3 Max 16-core CPU. Màn hình Liquid Retina XDR 120Hz siêu việt.", price: 89900000 },
      { name: "MacBook Pro M3 Pro 14-inch", desc: "Sự cân bằng hoàn hảo giữa sức mạnh và di động. Chip M3 Pro tối ưu năng lượng cực tốt.", price: 54900000 },
      { name: "MacBook Air M3 15-inch", desc: "Màn hình lớn 15.3 inch tuyệt đẹp trên thiết kế siêu mỏng nhẹ chỉ 1.5kg.", price: 32900000 },
      { name: "MacBook Air M3 13-inch", desc: "Laptop mỏng nhẹ quốc dân phiên bản mới nhất. Chip M3 mạnh hơn 60% so với thế hệ M1.", price: 27900000 },
      { name: "MacBook Pro M2 13-inch Touch Bar", desc: "Chiếc MacBook Pro cuối cùng sở hữu thanh Touch Bar huyền thoại.", price: 29900000 },
      { name: "MacBook Air M1 13-inch", desc: "Huyền thoại chưa bao giờ hết hot. Hiệu năng ổn định, pin trâu bò.", price: 18900000 }
    ],
    Dell: [
      { name: "Dell XPS 15 9530 OLED", desc: "Biểu tượng laptop Windows cao cấp. Màn hình 3.5K OLED rực rỡ, khung nhôm CNC.", price: 59900000 },
      { name: "Dell XPS 13 Plus 9320", desc: "Laptop đến từ tương lai với Trackpad tàng hình, dải phím cảm ứng tĩnh điện.", price: 42900000 },
      { name: "Dell Alienware m18 R2 Gaming", desc: "Quái vật làng Gaming. Màn hình khổng lồ 18 inch 240Hz, card đồ họa RTX 4090.", price: 109000000 },
      { name: "Dell Alienware x14 R2", desc: "Laptop Gaming mỏng nhất thế giới. Sức mạnh vô đối trong thân hình chỉ mỏng 14.5mm.", price: 64900000 },
      { name: "Dell Inspiron 16 5630", desc: "Lựa chọn tuyệt vời cho nhu cầu đa nền tảng. Màn hình 16 inch rộng rãi tỷ lệ 16:10.", price: 24900000 },
      { name: "Dell Latitude 9440 2-in-1", desc: "Dòng laptop doanh nhân cao cấp nhất. Bản lề xoay gập 360 độ linh hoạt.", price: 45000000 }
    ],
    Asus: [
      { name: "Asus ROG Strix SCAR 18", desc: "Kẻ hủy diệt Game AAA đỉnh cao nhất của Asus ROG. Đèn LED RGB phủ quanh viền.", price: 119000000 },
      { name: "Asus Zephyrus G14 OLED 2024", desc: "Laptop Gaming siêu mỏng nhẹ với thiết kế dải LED Slash Lighting chéo.", price: 49900000 },
      { name: "Asus Zenbook 14X OLED Space Edition", desc: "Phiên bản giới hạn kỷ niệm hành trình vũ trụ. Thiết kế họa tiết bản đồ chòm sao.", price: 38900000 },
      { name: "Asus TUF Gaming F15", desc: "Laptop quốc dân cho game thủ sinh viên. Độ bền chuẩn quân đội Mỹ.", price: 22900000 },
      { name: "Asus Vivobook Pro 15 OLED", desc: "Tuyệt phẩm cho nhà sáng tạo nội dung creator. Màn hình OLED chuẩn màu Pantone.", price: 26900000 },
      { name: "Asus ExpertBook B9 OLED", desc: "Laptop doanh nhân 14 inch nhẹ nhất thế giới (chỉ 990 gram).", price: 36900000 }
    ]
  },
  Phones: {
    iPhone: [
      { name: "iPhone 15 Pro Max", desc: "Khung viền Titan siêu cường. Chip A17 Pro tiến trình 3nm đầu tiên.", price: 34990000 },
      { name: "iPhone 15 Pro", desc: "Sức mạnh cực đại trong thân hình nhỏ gọn 6.1 inch. Tích hợp nút Action Button.", price: 28990000 },
      { name: "iPhone 15 Plus", desc: "Màn hình lớn 6.7 inch, thời lượng pin ảo diệu nhất trong toàn bộ gia đình iPhone.", price: 25990000 },
      { name: "iPhone 15", desc: "Bản nâng cấp lột xác với Dynamic Island, camera chính 48MP và cổng sạc USB-C.", price: 22990000 },
      { name: "iPhone 14 Pro Max", desc: "Cựu vương của Apple. Camera cực sắc nét, màn hình ProMotion 120Hz.", price: 26990000 },
      { name: "iPhone 13", desc: "Thiết kế camera chéo kinh điển. Sự lựa chọn hoàn hảo nhất cho người dùng phổ quát.", price: 13990000 }
    ],
    Samsung: [
      { name: "Galaxy S24 Ultra", desc: "Quyền năng Galaxy AI, dịch thuật trực tiếp đỉnh cao. Thân máy Titanium.", price: 33990000 },
      { name: "Galaxy Z Fold 5", desc: "Kiệt tác điện thoại màn hình gập. Bản lề giọt nước gập khít không khe hở.", price: 40990000 },
      { name: "Galaxy Z Flip 5", desc: "Smartphone gập vỏ sò sành điệu nhất. Màn hình phụ Flex Window khổng lồ 3.4 inch.", price: 25990000 },
      { name: "Galaxy S24 Plus", desc: "Bản nâng cấp dung lượng pin khủng. Tích hợp trọn bộ công nghệ AI tạo sinh.", price: 26990000 },
      { name: "Galaxy S23 FE", desc: "Phiên bản Fan Edition vung trọn tinh túy dòng S series ở mức giá trong mơ.", price: 14990000 },
      { name: "Galaxy A55 5G", desc: "Ông vua phân khúc tầm trung mới. Khung viền kim loại phay xước cao cấp.", price: 9990000 }
    ],
    Oppo: [
      { name: "Oppo Find N3 Fold", desc: "Tuyệt tác gập mở không nếp gấp. Cụm camera Hasselblad trứ danh bắt trọn ánh sáng.", price: 44990000 },
      { name: "Oppo Find N3 Flip", desc: "Màn hình phụ cỡ lớn đa dạng ứng dụng. Camera tinh chỉnh bởi Hasselblad sắc nét.", price: 22990000 },
      { name: "Oppo Reno 11 Pro 5G", desc: "Chuyên gia chân dung với AI thông minh, làm mịn da và làm mờ phông nền hoàn hảo.", price: 16990000 },
      { name: "Oppo Reno 11 5G", desc: "Màn hình cong 3D ấn tượng, sạc siêu nhan SuperVOOC 67W đầy pin trong chớp mắt.", price: 10990000 },
      { name: "Oppo A98 5G", desc: "Màn hình 120Hz mượt mà. Đạt chứng nhận mượt mà 48 tháng sử dụng.", price: 8990000 },
      { name: "Oppo A79 5G", desc: "Màn hình Sunlight Display rực rỡ ngoài trời, hệ thống loa âm thanh stereo đắm chìm.", price: 7490000 }
    ]
  },
  Audio: {
    Headphones: [
      { name: "Sony WH-1000XM5", desc: "Tai nghe chống ồn chủ động (ANC) đứng top 1 thế giới. Thiết kế sang trọng hoàn toàn mới.", price: 7990000 },
      { name: "Bose QuietComfort Ultra", desc: "Huyền thoại của sự thoải mái êm ái. Chống ồn đỉnh cao, công nghệ Immersive Audio.", price: 10490000 },
      { name: "Sennheiser Momentum 4 Wireless", desc: "Dành cho những Audiophile khắt khe nhất. Chất âm Audiophile signature cực mượt.", price: 8990000 },
      { name: "Apple AirPods Max", desc: "Kiệt tác kim loại nguyên khối. Màng lưới đỉnh đầu ôm khít tản lực siêu dễ chịu.", price: 12500000 },
      { name: "Marshall Major IV", desc: "Biểu tượng mang linh hồn Rock n Roll đậm chất cổ điển. Âm trung cực chất.", price: 3990000 },
      { name: "Beats Studio Pro", desc: "Chất Bass sôi động. Trải nghiệm Lossless Audio chân thật qua kết nối cáp USB-C.", price: 8500000 }
    ],
    Earbuds: [
      { name: "AirPods Pro 2 USB-C", desc: "Mẫu tai nghe quốc dân hệ sinh thái Apple. Tính năng Adaptive Audio thần thánh.", price: 6190000 },
      { name: "Sony WF-1000XM5", desc: "Nhỏ gọn, chất lượng âm thanh đỉnh cao hỗ trợ chuẩn Hi-Res LDAC cực xịn.", price: 6990000 },
      { name: "Samsung Galaxy Buds 2 Pro", desc: "Vũ khí hoàn hảo cho fan Samsung. Hỗ trợ chuẩn âm thanh 24-bit mượt mà.", price: 3990000 },
      { name: "Bose QuietComfort Earbuds II", desc: "Vị vua công nghệ chống ồn in-ear. Tai nghe tự điều chỉnh phân tích hình dạng ống tai.", price: 7500000 },
      { name: "Jabra Elite 10", desc: "Công nghệ bán mở ComfortFit. Âm thanh vòm Dolby Atmos với Head Tracking.", price: 5490000 },
      { name: "Sennheiser Momentum True Wireless 3", desc: "Tích hợp màng loa TrueResponse 7mm chế tác tại Đức. Bass sâu thăm thẳm.", price: 6500000 }
    ],
    Speakers: [
      { name: "Marshall Stanmore III", desc: "Loa cắm điện gia đình thiết kế da bọc vàng đồng cực kỳ chải chuốt.", price: 10990000 },
      { name: "JBL PartyBox 310", desc: "Trùm cuối trong các buổi dã ngoại và party quẩy đêm. Dàn đèn LED đổi màu.", price: 14990000 },
      { name: "Harmon Kardon Aura Studio 4", desc: "Loa thiết kế lồng giọt nước thủy tinh trong suốt, tỏa ánh sáng đa giác.", price: 6990000 },
      { name: "JBL Flip 6", desc: "Chiếc loa bé hạt tiêu đồng hành đi mọi nơi. Chống nước, chống bụi IP67.", price: 2990000 },
      { name: "Sony SRS-XV800", desc: "Loa quẩy mang sức mạnh khổng lồ của Sony. Kéo rạp hát di động với nguồn pin khủng.", price: 13900000 },
      { name: "Bose SoundLink Revolve+ II", desc: "Loa quai xách thần thánh lan tỏa âm thanh 360 độ hoàn hảo.", price: 8500000 }
    ]
  }
};

const imageMap = {
  MacBook: [
    "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
    "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
    "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp"
  ],
  Dell: [
    "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp",
    "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp",
    "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp"
  ],
  Asus: [
    "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
    "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp",
    "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp"
  ],
  iPhone: [
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp"
  ],
  Samsung: [
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/2.webp"
  ],
  Oppo: [
    "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/2.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/3.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/2.webp",
    "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/3.webp"
  ],
  Headphones: [
    "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp"
  ],
  Earbuds: [
    "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp",
    "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/2.webp",
    "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/3.webp"
  ],
  Speakers: [
    "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
    "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp"
  ]
};

const runPremiumSeeder = async () => {
  try {
    console.log("Purging all old items...");
    await Product.deleteMany({});
    
    // Also re-align departments to use the new "Oppo" category instead of Xiaomi
    await Department.deleteMany({});
    await Department.insertMany([
      { departmentName: "Laptops", categories: "MacBook,Dell,Asus" },
      { departmentName: "Phones", categories: "iPhone,Samsung,Oppo" },
      { departmentName: "Audio", categories: "Headphones,Earbuds,Speakers" }
    ]);

    const itemsToInsert = [];
    
    for (const [dept, categories] of Object.entries(premiumData)) {
      for (const [catName, productsList] of Object.entries(categories)) {
        for (let i = 0; i < productsList.length; i++) {
          const prod = productsList[i];
          const imgPath = `/images/products/${catName.toLowerCase()}-${i+1}.jpg`;

          itemsToInsert.push({
            imagePath: imgPath,
            title: prod.name,
            description: prod.desc,
            department: dept,
            category: catName,
            price: prod.price,
            color: "Premium Multi",
            size: "Standard",
            quantity: Math.floor(Math.random() * 30) + 5,
            date: Date.now() - (i * 5000)
          });
        }
      }
    }

    console.log(`Inserting exactly ${itemsToInsert.length} strictly-mapped premium products...`);
    await Product.insertMany(itemsToInsert);
    console.log("Seeding Completed Successfully! All brand images perfectly match their category!");
    
    mongoose.disconnect();
  } catch(e) {
    console.error(e);
    mongoose.disconnect();
  }
};

runPremiumSeeder();
