const { execSync } = require('child_process');
const path = require('path');

const publicImagesDir = path.join(__dirname, '../../../public/images');

const newImages = {
  "LongSleeve": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80", 
  "TankTop": "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=400&q=80"
};

console.log("Đang tải lại ảnh Áo Dài Tay và Áo Tank Top bằng Unsplash...");
for (const [key, url] of Object.entries(newImages)) {
  let dest = path.join(publicImagesDir, `mock_${key}.jpg`);
  try {
     execSync(`curl -s -L "${url}" -o "${dest}"`, { stdio: 'inherit' });
     console.log(`Đã tải xong ảnh xịn Unsplash cho: ${key}`);
  } catch(e) {
     console.log(`Lỗi khi tải: ${key} - ${e.message}`);
  }
}
