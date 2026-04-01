const axios = require('axios');
const cheerio = require('cheerio');

async function getUnsplashImage(query) {
  try {
    const res = await axios.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`);
    const $ = cheerio.load(res.data);
    let img = $('img').filter((i, el) => $(el).attr('src') && $(el).attr('src').includes('images.unsplash.com/photo')).first().attr('src');
    
    if (img) {
      // get the base url without query params, then add our own for 600x600 crop
      let base = img.split('?')[0];
      return `${base}?auto=format&fit=crop&q=80&w=600&h=600`;
    }
    return null;
  } catch(e) {
    console.log(e.message);
    return null;
  }
}

async function run() {
    let img = await getUnsplashImage("macbook pro");
    console.log("Result: " + img);
}
run();
