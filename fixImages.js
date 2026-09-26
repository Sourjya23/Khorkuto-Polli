const fs = require('fs');
const https = require('https');

let data = fs.readFileSync('lib/data.ts', 'utf8');

const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?w=600&h=600&fit=crop/g;
const urls = [...new Set(data.match(urlRegex))];

console.log(`Found ${urls.length} unique URLs`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 302);
    }).on('error', () => resolve(false));
  });
}

async function fix() {
  let counter = 1;
  for (const url of urls) {
    const isOk = await checkUrl(url);
    if (!isOk) {
      console.log(`Replacing broken URL: ${url}`);
      // Replace globally in the data
      data = data.replaceAll(url, `https://picsum.photos/seed/showpiece_${counter}/600/600`);
      counter++;
    } else {
      console.log(`OK: ${url}`);
    }
  }
  
  fs.writeFileSync('lib/data.ts', data);
  console.log('Fixed data.ts');
}

fix();
