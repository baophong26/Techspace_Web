var mongoose = require('mongoose');
var Product = require('../models/Product');
const mongoConfig = require('../configs/mongo-config');

mongoose.connect(mongoConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

async function translate() {
    let products = await Product.find({});
    for (let p of products) {
        // Multiply price by 10000 to simulate VND if it's currently low
        if (p.price < 10000) {
            p.price = Math.round(p.price * 10000);
        }
        
        // Translate some common titles
        if (p.title.includes('Top')) p.title = p.title.replace('Top', 'Áo Kiểu');
        if (p.title.includes('Jeans')) p.title = p.title.replace('Jeans', 'Quần Bò');
        if (p.title.includes('Jacket') || p.title.includes('BOMBER')) p.title = 'Áo Khoác Nhẹ';
        if (p.title.includes('SWEATSHIRT')) p.title = 'Áo Nỉ Dài Tay';
        if (p.title.includes('Swear')) p.title = 'Áo Len Đan';
        
        p.description = 'Đây là dòng sản phẩm cao cấp mới nhất, chất liệu vải vô cùng thoáng mát, thấm hút mồ hôi. Thiết kế thanh lịch, trẻ trung, rất phù hợp diện đi dạo phố hoặc đi làm.';
        
        await p.save();
    }
    console.log("Đã cập nhật dữ liệu tiếng Việt thành công!");
    process.exit();
}
translate();
