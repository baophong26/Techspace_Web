const https = require('https');
const fs = require('fs');

https.get('https://dummyjson.com/products?limit=200', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let json = JSON.parse(data);
    let laptops = json.products.filter(p => p.category.includes('laptop')).map(p => p.thumbnail);
    let phones = json.products.filter(p => p.category.includes('smartphone') || p.category.includes('mobile')).map(p => p.thumbnail);
    let audio = json.products.filter(p => p.category.includes('audio') || p.category.includes('headphone') || p.category.includes('accessory')).map(p => p.thumbnail);
    
    console.log("LAPTOPS:", laptops.slice(0, 10));
    console.log("PHONES:", phones.slice(0, 10));
    console.log("AUDIO:", audio.slice(0, 10));
    console.log("ALL CATS:", [...new Set(json.products.map(p => p.category))]);
  });
});
