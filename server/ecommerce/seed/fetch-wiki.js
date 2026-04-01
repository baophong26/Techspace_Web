const https = require('https');
const fs = require('fs');

function getWikiImage(title) {
  return new Promise((resolve) => {
    // try to get the main page image
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=800&titles=${encodeURIComponent(title)}`;
    https.get(url, { headers: { 'User-Agent': 'TechStoreBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1' || !pages[pageId].thumbnail) {
            resolve(null);
          } else {
            resolve(pages[pageId].thumbnail.source);
          }
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

const terms = [
  'IPhone_15_Pro', 'IPhone_14', 'IPhone_13', 'Samsung_Galaxy_S24', 'Samsung_Galaxy_S23', 'Samsung_Galaxy_Z_Fold_5',
  'MacBook_Pro', 'MacBook_Air', 'Dell_XPS', 'Asus_ROG', 'AirPods_Pro', 'Sony_WH-1000XM5'
];

(async () => {
  console.log("Fetching exact Wikipedia representations...");
  for (let t of terms) {
    let img = await getWikiImage(t);
    console.log(`${t}: ${img || 'NOT FOUND'}`);
  }
})();
