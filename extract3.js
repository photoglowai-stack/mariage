const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\apoll\\.gemini\\antigravity\\brain\\0f58dddb-e189-4b7e-af5a-e6db54af6033\\.system_generated\\steps\\238\\content.md', 'utf-8');

// match <video> tags or tags containing video
const videoTags = content.match(/<video[^>]*>[\s\S]*?<\/video>/gi);
console.log("Video tags:", videoTags ? videoTags.length : 0);

if (videoTags) {
  videoTags.forEach(tag => console.log(tag));
}
