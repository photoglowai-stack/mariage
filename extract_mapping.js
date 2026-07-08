const fs = require('fs');

async function extractDesigns() {
  try {
    const res = await fetch('https://reveliastudio.com/pages/creations');
    const html = await res.text();
    
    // We want to find blocks of HTML that contain a title and a video URL.
    // The videos on Revelia might be inside <video> tags, or data-src attributes, or Shopify CDN links.
    
    // Let's just grab all text that looks like a title and nearby video links.
    // Actually, let's use a regex to extract all Shopify video URLs.
    const videoRegex = /https:\/\/cdn\.shopify\.com\/videos\/c\/o\/v\/[a-zA-Z0-9]+\.mp4/g;
    const videos = [...new Set(html.match(videoRegex))];
    
    console.log("Total unique MP4s found:", videos.length);
    videos.forEach((v, i) => console.log(`Video ${i+1}: ${v}`));
    
    // Also let's try to extract titles by looking for heading tags.
    const titleRegex = /<h[2-4][^>]*>(.*?)<\/h[2-4]>/g;
    let match;
    const titles = [];
    while ((match = titleRegex.exec(html)) !== null) {
      let title = match[1].replace(/<[^>]+>/g, '').trim();
      if (title && title.length < 50) {
        titles.push(title);
      }
    }
    console.log("\nPotential titles found:", titles);
  } catch(e) {
    console.error(e);
  }
}

extractDesigns();
