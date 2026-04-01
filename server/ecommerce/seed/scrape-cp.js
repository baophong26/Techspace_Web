const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('https://cellphones.com.vn/mobile/apple.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      }
    });

    const body = res.data;
    const urls = body.match(/https:\/\/[a-zA-Z0-9.\-]+\/[^\s"'>]+\.(png|jpe?g|webp)/g);
    
    if (urls) {
      console.log("Found CellphoneS links:", [...new Set(urls)].slice(0, 30));
    } else {
      console.log("No links found.");
    }
  } catch(e) { console.error(e.message); }
}

testFetch();
