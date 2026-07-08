const fs = require('fs');

async function downloadAndExtract() {
  try {
    console.log("Fetching Revelia creations page...");
    const response = await fetch('https://reveliastudio.com/pages/creations');
    const html = await response.text();
    
    // Find all urls in src, data-src, href etc.
    const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_\/]+\.(?:mp4|webm|gif|m3u8)/gi;
    let matches = [...new Set(html.match(urlRegex))];
    
    if (matches.length === 0) {
      console.log("No standard video/gif URLs found. Let's look for Shopify CDN image URLs that might be used as gifs or videos.");
      const cdnRegex = /cdn\.shopify\.com\/[a-zA-Z0-9.\-_\/]+/gi;
      const cdnMatches = [...new Set(html.match(cdnRegex))];
      matches = cdnMatches.filter(m => m.includes('.gif') || m.includes('.mp4'));
      if(matches.length === 0) {
        console.log("Still no media found. Dumping all CDN matches:");
        console.log(cdnMatches);
      } else {
        console.log("Found CDN media:", matches);
      }
    } else {
      console.log("Found media:", matches);
    }
  } catch (err) {
    console.error(err);
  }
}

downloadAndExtract();
