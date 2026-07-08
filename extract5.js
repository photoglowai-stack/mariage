const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\apoll\\.gemini\\antigravity\\brain\\0f58dddb-e189-4b7e-af5a-e6db54af6033\\.system_generated\\steps\\238\\content.md', 'utf-8');
const regex = /cdn\.shopify\.com[^\s"'>]+/ig;
const matches = [...new Set(content.match(regex))];
console.log(JSON.stringify(matches, null, 2));
