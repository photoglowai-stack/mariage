const fs = require('fs');
const path = require('path');

const urls = [
  'https://cdn.shopify.com/videos/c/o/v/81eca3a3fcc54cb3ac3b677607176166.mp4',
  'https://cdn.shopify.com/videos/c/o/v/29aa0580d8c84bb5bcd1c3f0dd19df2d.mp4',
  'https://cdn.shopify.com/videos/c/o/v/a37d4ae840af4d25b4f3b8ee2c1d5717.mp4',
  'https://cdn.shopify.com/videos/c/o/v/0a15d770d85b47f491b511be23440004.mp4',
  'https://cdn.shopify.com/videos/c/o/v/2c8158a1afad48c9969774723dabcef4.mp4',
  'https://cdn.shopify.com/videos/c/o/v/b457874e5bb14b5aada3e2c2eb684021.mp4'
];

const names = ['ivory', 'sage', 'champagne', 'chocolate', 'bordeaux', 'terracotta'];
const dir = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadAll() {
  for (let i = 0; i < urls.length; i++) {
    const res = await fetch(urls[i]);
    const buffer = await res.arrayBuffer();
    const dest = path.join(dir, `${names[i]}.mp4`);
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Downloaded ${names[i]}.mp4`);
  }
}

downloadAll();
