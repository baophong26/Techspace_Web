const https = require('https');

https.get('https://dummyjson.com/products/category/smartphones', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log("Smartphones:", json.products.map(p => p.images[0]).slice(0, 3));
  });
});

https.get('https://dummyjson.com/products/category/laptops', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log("Laptops:", json.products.map(p => p.images[0]).slice(0, 3));
  });
});
