const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const arrayMatch = content.match(/export const CONTENT = (\[[\s\S]*\]);/);
if (!arrayMatch) {
  console.error("Could not find CONTENT array");
  process.exit(1);
}

let items = eval(arrayMatch[1]);

const URL_INFO = {
  'https://play2048.co/': { name: '2048', thumb: 'https://icons.duckduckgo.com/ip3/play2048.co.ico' },
  'https://coolors.co/generate': { name: 'Coolors', thumb: 'https://icons.duckduckgo.com/ip3/coolors.co.ico' },
  'https://excalidraw.com/': { name: 'Excalidraw', thumb: 'https://icons.duckduckgo.com/ip3/excalidraw.com.ico' },
  'https://regex101.com/': { name: 'Regex101', thumb: 'https://icons.duckduckgo.com/ip3/regex101.com.ico' },
  'https://www.desmos.com/calculator': { name: 'Desmos', thumb: 'https://icons.duckduckgo.com/ip3/desmos.com.ico' },
  'https://gchq.github.io/CyberChef/': { name: 'CyberChef', thumb: 'https://icons.duckduckgo.com/ip3/gchq.github.io.ico' },
  'https://playsnake.org/': { name: 'Snake', thumb: 'https://icons.duckduckgo.com/ip3/playsnake.org.ico' },
  'https://s0urce.io/': { name: 'S0urce.io', thumb: 'https://icons.duckduckgo.com/ip3/s0urce.io.ico' },
  'https://freepacman.org/': { name: 'Pac-Man', thumb: 'https://icons.duckduckgo.com/ip3/freepacman.org.ico' },
  'https://flappybird.io/': { name: 'Flappy Bird', thumb: 'https://icons.duckduckgo.com/ip3/flappybird.io.ico' },
  'https://scratch.mit.edu/projects/10128407/embed': { name: 'Scratch', thumb: 'https://icons.duckduckgo.com/ip3/scratch.mit.edu.ico' }
};

// We need to keep slugs unique, but set the title to the actual name
let countMap = {};

items = items.map(item => {
  if (URL_INFO[item.url]) {
    const info = URL_INFO[item.url];
    // Keep count to differentiate names if needed, e.g. "Excalidraw #2"
    if (!countMap[info.name]) countMap[info.name] = 0;
    countMap[info.name]++;
    
    // Set actual name (append number to make it unique if desired, but user said "jo actual naam hai wo daalo")
    // To make it look like a large database of variants, we can do "Excalidraw - Server 2" or something
    item.title = countMap[info.name] === 1 ? info.name : `${info.name} ${countMap[info.name]}`;
    item.thumbnail = info.thumb;
  }
  return item;
});

const newContent = `export const CONTENT = ${JSON.stringify(items, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent);
console.log("Restored actual names and duckduckgo logos!");
