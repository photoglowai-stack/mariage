const fs = require('fs');

async function scrape() {
  const html = await fetch('https://reveliastudio.com/pages/creations').then(r => r.text());
  
  // Find all cards which typically contain an h3 (title) and a video
  // We can just split by "<h3>" or whatever tag they use for titles.
  // In Shopify themes, titles are usually <h3> or <h4 class="card__heading">
  
  // A naive approach: find all titles and all videos in order
  const titles = [];
  const titleRegex = /<h3[^>]*>\s*(?:<a[^>]*>)?(.*?)(?:<\/a>)?\s*<\/h3>/g;
  let m;
  while ((m = titleRegex.exec(html)) !== null) {
    let t = m[1].replace(/<[^>]+>/g, '').trim();
    if (t) titles.push({ name: t, index: m.index });
  }
  
  const videos = [];
  // Cloudflare stream or shopify mp4
  const videoRegex = /(https:\/\/(?:cdn\.shopify\.com\/videos\/c\/o\/v\/[a-zA-Z0-9]+\.mp4|customer-u86xbpugorqyu327\.cloudflarestream\.com\/[a-zA-Z0-9]+\/manifest\/video\.m3u8))/g;
  while ((m = videoRegex.exec(html)) !== null) {
    videos.push({ url: m[1], index: m.index });
  }
  
  console.log("Found", titles.length, "titles and", videos.length, "videos");
  
  // Match each title with the closest video that appears AFTER it (or before it)
  // Usually the video is inside the same card. 
  titles.forEach(t => {
    // Find the closest video index
    let closestVideo = null;
    let minDiff = Infinity;
    videos.forEach(v => {
      let diff = Math.abs(v.index - t.index);
      if (diff < minDiff) {
        minDiff = diff;
        closestVideo = v.url;
      }
    });
    console.log(`Title: ${t.name} | Video: ${closestVideo}`);
  });
}

scrape();
