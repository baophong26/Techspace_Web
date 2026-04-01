const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('https://fptshop.com.vn/dien-thoai/apple-iphone', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    
    // FPTShop puts their JSON inside __NUXT__ or similar window object.
    const match = res.data.match(/<script>(window\.__NUXT__.*?)<\/script>/);
    if (match) {
      console.log("Found NUXT data, extracting images...");
    } else {
      console.log("No NUXT data found. HTML size:", res.data.length);
      const cdnLinks = res.data.match(/https:\/\/images\.fpt\.shop[^\s"'>]+/g);
      if (cdnLinks) {
        console.log("Found CDN links:", [...new Set(cdnLinks)].slice(0, 10));
      }
    }
  } catch(e) { console.error(e.message); }
}

testFetch();
