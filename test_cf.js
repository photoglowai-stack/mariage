const url = "https://customer-u86xbpugorqyu327.cloudflarestream.com/dd56b19a36d2302d980bcafece0a9b05/downloads/default.mp4";
fetch(url, { method: 'HEAD' }).then(res => {
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get('content-type'));
});
