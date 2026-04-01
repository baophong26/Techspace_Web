const fs = require('fs');
const path = require('path');

const cssDir = "d:/newProject/fashion-cube/src/assets/css";
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

const colorMap = [
  // Backgrounds
  { regex: /#ffffff/gi, replacement: '#121212' }, // White to Deep Black
  { regex: /#f5f5f5/gi, replacement: '#1a1a1a' },
  { regex: /#f8f8f8/gi, replacement: '#1a1a1a' },
  { regex: /background:\s*white/gi, replacement: 'background: #121212' },
  
  // Accents (Red to Gold)
  { regex: /#fe4c50/gi, replacement: '#D4AF37' }, // Red to Metallic Gold
  { regex: /#ff6347/gi, replacement: '#FFD700' }, // Tomato to Bright Gold
  { regex: /#e54e5d/gi, replacement: '#D4AF37' },
  
  // Text Colors
  { regex: /#1e1e27/gi, replacement: '#e0e0e0' }, // Dark Body text to Light Silver
  { regex: /#282828/gi, replacement: '#FFD700' }, // Dark Headings to Gold
  { regex: /#232530/gi, replacement: '#D4AF37' }, // Dark Nav text to Gold
  
  // Borders and Muted elements
  { regex: /#ebebeb/gi, replacement: '#333333' },
  { regex: /#dddddd/gi, replacement: '#333333' },
  { regex: /#b5aec4/gi, replacement: '#aaaaaa' },
  { regex: /#eceff6/gi, replacement: '#2a2a2a' },
];

for (const file of files) {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  for (const map of colorMap) {
    content = content.replace(map.regex, map.replacement);
  }
  
  // Special overrides for dark mode
  content += `\n
  /* --- PREMIUM BLACK & GOLD OVERRIDES --- */
  .main_slider_content h1, .main_slider_content h6 { color: #FFD700 !important; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
  .benefit, .deal_ofthe_week { background-color: #1a1a1a !important; }
  .newsletter { background-color: #121212 !important; border-top: 1px solid #D4AF37; }
  .footer { background-color: #0d0d0d !important; }
  .card { background-color: #1a1a1a !important; border-color: #333 !important; }
  .product_name div { color: #e0e0e0 !important; }
  .product_price { color: #D4AF37 !important; }
  input, select, textarea { background-color: #222 !important; color: #FFD700 !important; border-color: #444 !important; }
  .top_nav, .header { background: #0a0a0a !important; border-bottom: 1px solid #333 !important; }
  .top_nav_left { color: #D4AF37 !important; }
  `;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${file}`);
}

console.log('Premium Black & Gold aesthetic applied globally!');
