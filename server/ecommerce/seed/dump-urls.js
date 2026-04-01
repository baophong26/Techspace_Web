const https = require('https');
https.get('https://dummyjson.com/products?limit=200', (res) => {
  let data = ''; res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let json = JSON.parse(data);
    let laptops = json.products.filter(p => p.category === 'laptops').map(p => p.images).flat();
    let phones = json.products.filter(p => p.category === 'smartphones').map(p => p.images).flat();
    let audio = json.products.filter(p => p.category === 'mobile-accessories').map(p => p.images).flat();
    require('fs').writeFileSync('urls.json', JSON.stringify({laptops, phones, audio}, null, 2));
    console.log(`Saved ${laptops.length} laptops, ${phones.length} phones, ${audio.length} audio to urls.json!`);
  });
});
