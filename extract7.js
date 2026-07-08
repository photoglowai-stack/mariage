const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\apoll\\OneDrive\\Bureau\\Mariage\\revelia-creations.html', 'utf-8');
const regex = /(?:https?:)?\/\/cdn\.shopify\.com[^\s"'>]+/ig;
const matches = [...new Set(content.match(regex))];
console.log(JSON.stringify(matches.filter(m => m.includes('mp4') || m.includes('webm') || m.includes('gif')), null, 2));
