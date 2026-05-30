import fs from 'fs';
import https from 'https';

const url = 'https://raw.githubusercontent.com/pmndrs/drei-assets/master/cloud.png';
const dest = 'public/cloud-particle.png';

console.log(`Downloading default cloud texture from ${url}...`);

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download: Status Code ${response.statusCode}`);
    return;
  }
  
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log(`Successfully downloaded cloud texture and saved to: ${dest}`);
    console.log(`File size: ${fs.statSync(dest).size} bytes`);
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error(`Error downloading file: ${err.message}`);
});
