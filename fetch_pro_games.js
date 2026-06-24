const fs = require('fs');
const path = require('path');

const TOOLS = [
  {
    title: 'Excalidraw',
    url: 'https://excalidraw.com/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/excalidraw.com.ico',
    category: 'Design',
    type: 'tool'
  },
  {
    title: 'Desmos Graphing Calculator',
    url: 'https://www.desmos.com/calculator',
    thumbnail: 'https://icons.duckduckgo.com/ip3/desmos.com.ico',
    category: 'Math',
    type: 'tool'
  },
  {
    title: 'Regex101',
    url: 'https://regex101.com/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/regex101.com.ico',
    category: 'Developer',
    type: 'tool'
  },
  {
    title: 'CyberChef',
    url: 'https://gchq.github.io/CyberChef/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/gchq.github.io.ico',
    category: 'Security',
    type: 'tool'
  },
  {
    title: 'Coolors',
    url: 'https://coolors.co/generate',
    thumbnail: 'https://icons.duckduckgo.com/ip3/coolors.co.ico',
    category: 'Design',
    type: 'tool'
  },
  {
    title: 'Photopea',
    url: 'https://www.photopea.com/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/photopea.com.ico',
    category: 'Design',
    type: 'tool'
  },
  {
    title: 'JSFiddle',
    url: 'https://jsfiddle.net/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/jsfiddle.net.ico',
    category: 'Developer',
    type: 'tool'
  },
  {
    title: 'CodePen',
    url: 'https://codepen.io/pen/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/codepen.io.ico',
    category: 'Developer',
    type: 'tool'
  },
  {
    title: 'Draw.io',
    url: 'https://app.diagrams.net/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/draw.io.ico',
    category: 'Design',
    type: 'tool'
  },
  {
    title: 'Google Earth',
    url: 'https://earth.google.com/web/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/earth.google.com.ico',
    category: 'Education',
    type: 'tool'
  },
  {
    title: 'Canva',
    url: 'https://www.canva.com/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/canva.com.ico',
    category: 'Design',
    type: 'tool'
  },
  {
    title: 'JSON Editor Online',
    url: 'https://jsoneditoronline.org/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/jsoneditoronline.org.ico',
    category: 'Developer',
    type: 'tool'
  },
  {
    title: 'ColorHunt',
    url: 'https://colorhunt.co/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/colorhunt.co.ico',
    category: 'Design',
    type: 'tool'
  },
  {
    title: 'CodeSandbox',
    url: 'https://codesandbox.io/s/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/codesandbox.io.ico',
    category: 'Developer',
    type: 'tool'
  },
  {
    title: 'Pomofocus',
    url: 'https://pomofocus.io/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/pomofocus.io.ico',
    category: 'Productivity',
    type: 'tool'
  },
  {
    title: 'Globe GL',
    url: 'https://globe.gl/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/globe.gl.ico',
    category: 'Education',
    type: 'tool'
  },
  {
    title: 'Windy',
    url: 'https://www.windy.com/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/windy.com.ico',
    category: 'Education',
    type: 'tool'
  },
  {
    title: '10FastFingers',
    url: 'https://10fastfingers.com/typing-test/english',
    thumbnail: 'https://icons.duckduckgo.com/ip3/10fastfingers.com.ico',
    category: 'Productivity',
    type: 'tool'
  },
  {
    title: 'Monkeytype',
    url: 'https://monkeytype.com/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/monkeytype.com.ico',
    category: 'Productivity',
    type: 'tool'
  },
  {
    title: 'Online Sequencer',
    url: 'https://onlinesequencer.net/',
    thumbnail: 'https://icons.duckduckgo.com/ip3/onlinesequencer.net.ico',
    category: 'Audio',
    type: 'tool'
  }
];

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function fetchGames() {
  let allGames = [];
  
  for (let page = 1; page <= 5; page++) {
    console.log(`Fetching page ${page}...`);
    try {
      const res = await fetch(`https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?collection=all&categories=All&type=all&amount=100&page=${page}&format=json`);
      const data = await res.json();
      
      const mapped = data.map(game => ({
        title: game.Title,
        url: game.Url,
        thumbnail: game.Asset[1] || game.Asset[0],
        category: (game.Category && game.Category[0]) ? game.Category[0] : 'Casual',
        type: 'game'
      }));
      allGames.push(...mapped);
    } catch(err) {
      console.error(err);
    }
  }
  
  // Combine games and tools
  const combined = [...allGames.slice(0, 480), ...TOOLS];
  
  // Create unique slugs
  const countMap = {};
  const finalData = combined.map(item => {
    let baseSlug = generateSlug(item.title);
    if (!baseSlug) baseSlug = 'item';
    
    if (!countMap[baseSlug]) countMap[baseSlug] = 0;
    countMap[baseSlug]++;
    
    if (countMap[baseSlug] > 1) {
      baseSlug = `${baseSlug}-${countMap[baseSlug]}`;
    }
    
    return {
      slug: baseSlug,
      ...item
    };
  });
  
  console.log(`Total items ready: ${finalData.length}`);
  
  const fileContent = `export const GAMES_DATA = ${JSON.stringify(finalData, null, 2)};\n`;
  const filePath = path.join(__dirname, 'src', 'lib', 'data.ts');
  
  fs.writeFileSync(filePath, fileContent);
  console.log('Saved to src/lib/data.ts!');
}

fetchGames();
