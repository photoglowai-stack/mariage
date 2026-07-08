const fs = require('fs');
const path = require('path');

const mediaList = [
  { id: 'bordeaux', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/dd56b19a36d2302d980bcafece0a9b05/manifest/video.m3u8' },
  { id: 'ivory', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/9e57ea8e2c14183b1140d5eef91b251c/manifest/video.m3u8' },
  { id: 'champagne', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/439399c37fbad32cb0ba93ffc7713b69/manifest/video.m3u8' },
  { id: 'terracotta', video: 'https://cdn.shopify.com/videos/c/o/v/81eca3a3fcc54cb3ac3b677607176166.mp4' },
  { id: 'royal-bordeaux', video: 'https://cdn.shopify.com/videos/c/o/v/29aa0580d8c84bb5bcd1c3f0dd19df2d.mp4' },
  { id: 'royal-blue', video: 'https://cdn.shopify.com/videos/c/o/v/a37d4ae840af4d25b4f3b8ee2c1d5717.mp4' },
  { id: 'sage', video: 'https://cdn.shopify.com/videos/c/o/v/0a15d770d85b47f491b511be23440004.mp4' },
  { id: 'chocolate', video: 'https://cdn.shopify.com/videos/c/o/v/2c8158a1afad48c9969774723dabcef4.mp4' },
  { id: 'horizon-bordeaux', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/47b17342ad434b773bcb0c5b7582bbfa/manifest/video.m3u8' },
  { id: 'royal-doves', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/34119f0cba33e125710e7c2dfcf45943/manifest/video.m3u8' },
  { id: 'imperial-light', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/194e16370089ac27b0464455576c637b/manifest/video.m3u8' },
  { id: 'golden-palace', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/80a977a46496f3956dbe745607689ac2/manifest/video.m3u8' },
  { id: 'oriental-palace', video: 'https://cdn.shopify.com/videos/c/o/v/b457874e5bb14b5aada3e2c2eb684021.mp4' },
  { id: 'celestial-veil', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/43f029a336f1e31fa1152206809f07b7/manifest/video.m3u8' },
  { id: 'ivory-veil', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/d9efe568efe5fa99985419616cb4b4a1/manifest/video.m3u8' },
  { id: 'rose-veil', video: 'https://customer-u86xbpugorqyu327.cloudflarestream.com/5181e3859babf8afd60f258d31db1f20/manifest/video.m3u8' }
];

const dir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadAll() {
  for (const item of mediaList) {
    let url = item.video;
    if (url.includes('cloudflarestream.com')) {
      url = url.replace('/manifest/video.m3u8', '/thumbnails/thumbnail.mp4');
    }
    
    console.log(`Downloading ${item.id}.mp4 from ${url}`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      const dest = path.join(dir, `${item.id}.mp4`);
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Saved ${dest}`);
    } catch (e) {
      console.error(`Failed to download ${item.id}:`, e);
    }
  }
}

downloadAll();
