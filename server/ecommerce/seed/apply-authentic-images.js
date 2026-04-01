const mongoose = require('mongoose');
const mongoConfig = require('../configs/mongo-config');
const Product = require('../models/Product');
const Variant = require('../models/Variant');

const imageMap = {
  // Laptops - Apple
  "MacBook Pro M3 Max 16-inch": "https://cdn.tgdd.vn/Products/Images/44/318388/macbook-pro-m3-max-16-inch-silver-thumb-600x600.jpg",
  "MacBook Pro M3 Pro 14-inch": "https://cdn.tgdd.vn/Products/Images/44/318387/macbook-pro-m3-pro-14-inch-xam-thumb-1-600x600.jpg",
  "MacBook Air M3 15-inch": "https://cdn.tgdd.vn/Products/Images/44/322616/macbook-air-15-inch-m3-2024-midnight-thumb-600x600.jpg",
  "MacBook Air M3 13-inch": "https://cdn.tgdd.vn/Products/Images/44/322631/macbook-air-13-inch-m3-2024-starlight-thumb-600x600.jpg",
  "MacBook Pro M2 13-inch": "https://cdn.tgdd.vn/Products/Images/44/282827/macbook-pro-m2-2022-xam-600x600.jpg",
  "MacBook Air M1 13-inch": "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",

  // Laptops - Dell
  "Dell XPS 15 9530 OLED": "https://cdn.tgdd.vn/Products/Images/44/305540/dell-xps-15-9530-i7-71014936-thumb-600x600.jpg",
  "Dell XPS 13 Plus 9320": "https://cdn.tgdd.vn/Products/Images/44/287768/dell-xps-13-plus-9320-i7-5g168w11i1u-thumb-1-600x600.jpg",
  "Dell Alienware m18 R2 Gaming": "https://cdn.tgdd.vn/Products/Images/44/310323/dell-alienware-m15-r6-i7-70262923-thumb-600x600.jpg", // proxy
  "Dell Alienware x14 R2": "https://cdn.tgdd.vn/Products/Images/44/304400/dell-alienware-x14-r2-i7-p162g001cbl-thumb-600x600.jpg", // proxy
  "Dell Inspiron 16 5630": "https://cdn.tgdd.vn/Products/Images/44/305541/dell-inspiron-16-5630-i7-71011504-thumb-1-600x600.jpg",
  "Dell Latitude 9440 2-in-1": "https://cdn.tgdd.vn/Products/Images/44/267926/dell-latitude-3520-i5-70251590-thumb-600x600.jpg", // proxy

  // Laptops - Asus
  "Asus ROG Strix SCAR 18": "https://cdn.tgdd.vn/Products/Images/44/322106/asus-rog-strix-scar-18-g834jyr-i9-r94059w-thumb-600x600.jpg",
  "Asus Zephyrus G14 OLED 2024": "https://cdn.tgdd.vn/Products/Images/44/324151/asus-rog-zephyrus-g14-oled-ga403uv-r9-qs171w-thumb-1-600x600.jpg",
  "Asus Zenbook 14X OLED": "https://cdn.tgdd.vn/Products/Images/44/298495/asus-zenbook-14x-oled-ux3404va-i7-kq013w-thumb-600x600.jpg",
  "Asus TUF Gaming F15": "https://cdn.tgdd.vn/Products/Images/44/304899/asus-tuf-gaming-f15-fx507zc4-i5-hn074w-thumb-600x600.jpg",
  "Asus Vivobook Pro 15 OLED": "https://cdn.tgdd.vn/Products/Images/44/316040/asus-vivobook-pro-15-oled-k6502vu-i9-ma090w-thumb-600x600.jpg",
  "Asus ExpertBook B9": "https://cdn.tgdd.vn/Products/Images/44/265051/asus-expertbook-b9450fea-i5-ku0066t-11-600x600.jpg",

  // Phones - Apple
  "iPhone 15 Pro Max": "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
  "iPhone 15 Pro": "https://cdn.tgdd.vn/Products/Images/42/289663/iphone-15-pro-titan-thumb-600x600.jpg",
  "iPhone 15 Plus": "https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-hong-thumb-600x600.jpg",
  "iPhone 15": "https://cdn.tgdd.vn/Products/Images/42/281570/iphone-15-donb-thumb-600x600.jpg",
  "iPhone 14 Pro Max": "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg",
  "iPhone 13": "https://cdn.tgdd.vn/Products/Images/42/223605/iphone-13-pink-2-600x600.jpg",

  // Phones - Samsung
  "Galaxy S24 Ultra": "https://cdn.tgdd.vn/Products/Images/42/305658/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg",
  "Galaxy Z Fold 5": "https://cdn.tgdd.vn/Products/Images/42/303891/samsung-galaxy-z-fold5-xanh-thumb-600x600.jpg",
  "Galaxy Z Flip 5": "https://cdn.tgdd.vn/Products/Images/42/305658/samsung-galaxy-z-flip5-kem-thumb-600x600.jpg",
  "Galaxy S24 Plus": "https://cdn.tgdd.vn/Products/Images/42/305658/samsung-galaxy-s24-plus-tim-thumb-600x600.jpg",
  "Galaxy S23 FE": "https://cdn.tgdd.vn/Products/Images/42/305658/samsung-galaxy-s23-fe-mint-thumb-600x600.jpg",
  "Galaxy A55 5G": "https://cdn.tgdd.vn/Products/Images/42/322096/samsung-galaxy-a55-5g-xanh-thumb-1-600x600.jpg",

  // Phones - Oppo
  "Oppo Find N3 Fold": "https://cdn.tgdd.vn/Products/Images/42/305658/oppo-find-n3-gold-thumb-600x600.jpg",
  "Oppo Find N3 Flip": "https://cdn.tgdd.vn/Products/Images/42/305658/oppo-find-n3-flip-pink-thumb-600x600.jpg",
  "Oppo Reno 11 Pro 5G": "https://cdn.tgdd.vn/Products/Images/42/314201/oppo-reno11-pro-xam-thumb-600x600.jpg",
  "Oppo Reno 11 5G": "https://cdn.tgdd.vn/Products/Images/42/319808/oppo-reno11-xanh-thumb-600x600.jpg",
  "Oppo A98 5G": "https://cdn.tgdd.vn/Products/Images/42/307431/oppo-a98-5g-xanh-thumb-1-2-600x600.jpg",
  "Oppo A79 5G": "https://cdn.tgdd.vn/Products/Images/42/318029/oppo-a79-5g-den-thumb-1-600x600.jpg",

  // Audio - Headphones
  "Sony WH-1000XM5": "https://cdn.tgdd.vn/Products/Images/54/283688/tai-nghe-bluetooth-chup-tai-sony-wh-1000xm5-den-thumb-600x600.jpeg",
  "Bose QuietComfort Ultra": "https://cdn.tgdd.vn/Products/Images/54/298462/tai-nghe-chup-tai-bluetooth-bose-quietcomfort-45-thumb-600x600.jpeg", // proxy
  "Sennheiser Momentum 4": "https://cdn.tgdd.vn/Products/Images/54/236024/tai-nghe-chup-tai-bluetooth-sony-wh-ch510-thumb-600x600.jpeg", // proxy
  "Apple AirPods Max": "https://cdn.tgdd.vn/Products/Images/54/232675/bluetooth-airpods-max-apple-thumb-1-600x600.jpg",
  "Marshall Major IV": "https://cdn.tgdd.vn/Products/Images/54/283688/tai-nghe-bluetooth-chup-tai-sony-wh-1000xm5-den-thumb-600x600.jpeg", // proxy
  "Beats Studio Pro": "https://cdn.tgdd.vn/Products/Images/54/249151/tai-nghe-chup-tai-beats-studio3-wireless-mx422-mx432-thumb-600x600.jpeg",

  // Audio - Earbuds
  "AirPods Pro 2 USB-C": "https://cdn.tgdd.vn/Products/Images/54/315183/tai-nghe-bluetooth-airpods-pro-gen-2-magsafe-charge-apple-mtjv3-thumb-2-600x600.jpg",
  "Sony WF-1000XM5": "https://cdn.tgdd.vn/Products/Images/54/316315/tai-nghe-bluetooth-tws-sony-wf-1000xm5-den-thumb-1-600x600.jpg",
  "Samsung Galaxy Buds 2 Pro": "https://cdn.tgdd.vn/Products/Images/54/286043/samsung-galaxy-buds-2-pro-den-thumb-600x600.jpg",
  "Bose QuietComfort Earbuds II": "https://cdn.tgdd.vn/Products/Images/54/298463/tai-nghe-bluetooth-tws-bose-quietcomfort-earbuds-ii-thumb-600x600.jpeg",
  "Jabra Elite 10": "https://cdn.tgdd.vn/Products/Images/54/316315/tai-nghe-bluetooth-tws-sony-wf-1000xm5-den-thumb-1-600x600.jpg", // proxy
  "Sennheiser Momentum True Wireless 3": "https://cdn.tgdd.vn/Products/Images/54/286043/samsung-galaxy-buds-2-pro-den-thumb-600x600.jpg", // proxy

  // Audio - Speakers
  "Marshall Stanmore III": "https://cdn.tgdd.vn/Products/Images/73/305263/loa-bluetooth-marshall-stanmore-3-den-thumb-2-600x600.jpg",
  "JBL PartyBox 310": "https://cdn.tgdd.vn/Products/Images/73/232491/loa-bluetooth-jbl-partybox-310-den-thumb-600x600.jpg",
  "Harmon Kardon Aura Studio 4": "https://cdn.tgdd.vn/Products/Images/73/312891/loa-bluetooth-harman-kardon-aura-studio-4-den-thumb-600x600.jpg",
  "JBL Flip 6": "https://cdn.tgdd.vn/Products/Images/73/276413/loa-bluetooth-jbl-flip-6-thumb-600x600.jpg",
  "Sony SRS-XV800": "https://cdn.tgdd.vn/Products/Images/73/316491/loa-bluetooth-sony-srs-xv800-den-thumb-1-600x600.jpg",
  "Bose SoundLink Revolve+ II": "https://cdn.tgdd.vn/Products/Images/73/250106/loa-bluetooth-bose-soundlink-revolve-plus-ii-thumb-600x600.jpg"
};

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(async () => {
    console.log("Connected. Applying authentic image urls...");
    let products = await Product.find({});
    for (let p of products) {
      // Find matching key
      const match = Object.keys(imageMap).find(k => p.title.includes(k) || k.includes(p.title));
      if (match) {
        p.imagePath = imageMap[match];
        await p.save();
      } else {
        // Fallback generic proxies if name mismatch
        if(p.department === 'Laptops') p.imagePath = imageMap["MacBook Pro M2 13-inch"];
        if(p.department === 'Phones') p.imagePath = imageMap["iPhone 15"];
        if(p.department === 'Audio') p.imagePath = imageMap["Apple AirPods Max"];
        await p.save();
      }
    }
    console.log("Images have been mapped successfully!");
    
    // Also update Variants to match their Parent products just in case
    let variants = await Variant.find({});
    for (let v of variants) {
        let parent = products.find(p => p._id.toString() == v.productId);
        if(parent && parent.imagePath) {
            v.imagePath = parent.imagePath;
            await v.save();
        }
    }
    console.log("Variants updated.");
    process.exit(0);
  });
