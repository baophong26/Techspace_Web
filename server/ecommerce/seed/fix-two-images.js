const { execSync } = require('child_process');
const path = require('path');

const publicImagesDir = path.join(__dirname, '../../../public/images');

const newImages = {
  "Bag": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80", 
  "Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"
};

console.log("Đang tải lại ảnh Cặp xách và Áo...");
for (const [key, url] of Object.entries(newImages)) {
  let dest = path.join(publicImagesDir, `mock_${key}.jpg`);
  try {
     execSync(`curl -s -L "${url}" -o "${dest}"`, { stdio: 'inherit' });
     console.log(`Đã tải xong ảnh xịn cho: ${key}`);
  } catch(e) {
     console.log(`Lỗi khi tải: ${key} - ${e.message}`);
  }
}
