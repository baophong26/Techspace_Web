const mongoose = require('mongoose');
const Product = require('../models/Product');
const dbURL = require('../configs/mongo-config');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log(err));

const laptopImages = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&q=80&w=800"
];

const phoneImages = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800"
];

const audioImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800"
];

const wearableImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800"
];

const getImageForDept = (dept, i) => {
  if (dept === "Laptops") return laptopImages[i % laptopImages.length];
  if (dept === "Phones") return phoneImages[i % phoneImages.length];
  if (dept === "Audio") return audioImages[i % audioImages.length];
  return wearableImages[i % wearableImages.length];
};

const structure = {
  Laptops: {
    MacBook: [
      { name: "Pro M3 Max 16-inch", price: 89900000 },
      { name: "Pro M3 Pro 14-inch", price: 46670000 },
      { name: "Air M3 15-inch", price: 27970000 },
      { name: "Air M3 13-inch", price: 23720000 },
      { name: "Pro M2 13-inch Touch Bar", price: 25420000 },
      { name: "Air M1 13-inch", price: 16070000 },
      { name: "Pro M1 14-inch (Refurbished)", price: 32000000 },
      { name: "Air M2 13-inch", price: 21990000 },
      { name: "Pro M2 Max 16-inch", price: 65900000 }
    ],
    Dell: [
      { name: "XPS 15 9530 OLED", price: 54900000 },
      { name: "XPS 13 Plus", price: 42900000 },
      { name: "Alienware m18 R2 Gaming", price: 89000000 },
      { name: "Inspiron 16 5630", price: 21900000 },
      { name: "Latitude 7440 Business", price: 35000000 }
    ],
    Asus: [
      { name: "ROG Strix SCAR 18", price: 109000000 },
      { name: "Zephyrus G14 OLED", price: 45900000 },
      { name: "Zenbook 14X OLED", price: 29900000 },
      { name: "TUF Gaming A15", price: 22900000 },
      { name: "Vivobook Pro 15", price: 19900000 }
    ],
    HP: [
      { name: "Spectre x360 14", price: 39900000 },
      { name: "Omen 16 Gaming", price: 41900000 },
      { name: "Envy 15 OLED", price: 32900000 },
      { name: "Pavilion Aero 13", price: 18900000 },
      { name: "Victus 15", price: 17900000 }
    ],
    Lenovo: [
      { name: "Legion Pro 7i Gen 9", price: 69900000 },
      { name: "ThinkPad X1 Carbon Gen 12", price: 45900000 },
      { name: "Yoga Pro 9i", price: 38900000 },
      { name: "IdeaPad Slim 7", price: 24900000 },
      { name: "LOQ 15IRH8", price: 21900000 }
    ]
  },
  Phones: {
    iPhone: [
      { name: "15 Pro Max Titan", price: 34990000 },
      { name: "15 Pro", price: 28990000 },
      { name: "15 Plus", price: 25990000 },
      { name: "15", price: 22990000 },
      { name: "14 Pro Max", price: 26990000 }
    ],
    Samsung: [
      { name: "Galaxy S24 Ultra", price: 33990000 },
      { name: "Galaxy Z Fold 5", price: 40990000 },
      { name: "Galaxy Z Flip 5", price: 25990000 },
      { name: "Galaxy S24 Plus", price: 26990000 },
      { name: "Galaxy S23 FE", price: 14990000 }
    ],
    Xiaomi: [
      { name: "14 Ultra Leica", price: 32990000 },
      { name: "14 Pro", price: 24900000 },
      { name: "13T Pro", price: 15990000 },
      { name: "Redmi Note 13 Pro+", price: 10990000 },
      { name: "Poco X6 Pro", price: 8990000 }
    ],
    Oppo: [
      { name: "Find X7 Ultra", price: 29990000 },
      { name: "Find N3 Fold", price: 41990000 },
      { name: "Reno 11 Pro", price: 16990000 },
      { name: "Reno 11 F", price: 9500000 },
      { name: "A98 5G", price: 7500000 }
    ]
  },
  Audio: {
    Headphones: [
      { name: "Sony WH-1000XM5", price: 7990000 },
      { name: "Bose QuietComfort Ultra", price: 10490000 },
      { name: "Sennheiser Momentum 4", price: 8990000 },
      { name: "Apple AirPods Max", price: 12500000 },
      { name: "Marshall Major IV", price: 3990000 }
    ],
    Earbuds: [
      { name: "AirPods Pro 2 USB-C", price: 6190000 },
      { name: "Sony WF-1000XM5", price: 6990000 },
      { name: "Samsung Galaxy Buds 2 Pro", price: 3990000 },
      { name: "Sennheiser Momentum True Wireless 3", price: 6500000 },
      { name: "Jabra Elite 10", price: 5490000 }
    ],
    Speakers: [
      { name: "Marshall Stanmore III", price: 10990000 },
      { name: "JBL PartyBox 310", price: 14990000 },
      { name: "Harmon Kardon Aura Aura Studio 4", price: 6990000 },
      { name: "JBL Flip 6", price: 2990000 },
      { name: "Sony SRS-XB100", price: 1290000 }
    ],
    Wearables: [
      { name: "Apple Watch Ultra 2", price: 21990000 },
      { name: "Apple Watch Series 9", price: 10490000 },
      { name: "Garmin Fenix 7 Pro", price: 22590000 },
      { name: "Samsung Galaxy Watch 6 Classic", price: 8990000 },
      { name: "Huawei Watch GT 4", price: 5990000 }
    ]
  }
};

const massiveProducts = [];
let timeOffset = 10000;
let globalImgIdx = 0;

for (const [dept, categories] of Object.entries(structure)) {
  for (const [catName, products] of Object.entries(categories)) {
    for (const prod of products) {
      let imgPath = getImageForDept(dept, globalImgIdx);
      globalImgIdx++;
      
      massiveProducts.push({
        imagePath: imgPath,
        title: `${catName} ${prod.name}`,
        description: `Sản phẩm ${catName} ${prod.name} chính hãng cao cấp. Công nghệ tiên tiến, thiết kế hiện đại sang trọng mang lại trải nghiệm tuyệt vời.`,
        department: dept,
        category: catName,
        price: prod.price,
        color: "Titanium / Black / White",
        size: "Standard",
        quantity: Math.floor(Math.random() * 50) + 10,
        date: Date.now() - timeOffset
      });
      timeOffset += 1000;
    }
  }
}

const runSeeder = async () => {
  try {
    console.log("Deleting old products...");
    await Product.deleteMany({});
    console.log(`Inserting ${massiveProducts.length} new realistic tech products...`);
    await Product.insertMany(massiveProducts);
    console.log("Massive Seeding Successful!");
    mongoose.disconnect();
  } catch(e) {
    console.error(e);
    mongoose.disconnect();
  }
};

runSeeder();
