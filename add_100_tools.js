const fs = require('fs');
const path = require('path');

const uselessSites = [
  "https://longdogechallenge.com/",
  "https://movenowthinklater.com/",
  "https://thezen.zone/",
  "https://thatsthefinger.com/",
  "https://cant-not-tweet-this.com/",
  "https://eelslap.com/",
  "https://www.staggeringbeauty.com/",
  "https://burymewithmymoney.com/",
  "https://smashthewalls.com/",
  "https://jacksonpollock.org/",
  "https://endless.horse/",
  "https://www.trypap.com/",
  "https://www.republiquedesmangues.fr/",
  "https://mandalagaba.com/",
  "https://www.fallingfalling.com/",
  "https://cat-bounce.com/",
  "https://chrismckenzie.com/",
  "https://theuselessweb.com/",
  "https://hackertyper.net/",
  "https://pointerpointer.com/",
  "https://www.boredbutton.com/",
  "https://zoomquilt.org/",
  "https://inspirobot.me/",
  "https://koalastothemax.com/",
  "https://neal.fun/asteroid-launcher/",
  "https://www.geoguessr.com/",
  "https://driveandlisten.herokuapp.com/",
  "https://window-swap.com/",
  "https://findtheinvisiblecow.com/",
  "https://my90stv.com/",
  "https://quickdraw.withgoogle.com/",
  "https://www.radiooooo.com/",
  "https://www.drawastickman.com/",
  "https://weavesilk.com/",
  "https://thisissand.com/",
  "https://musclewiki.com/",
  "https://asoftmurmur.com/",
  "https://symphonyofscience.com/",
  "https://www.incredibox.com/",
  "https://radio.garden/",
  "https://www.bouncingdvdlogo.com/",
  "https://stellarium-web.org/",
  "https://thetruesize.com/",
  "https://scaleofuniverse.com/",
  "https://neal.fun/deep-sea/",
  "https://neal.fun/space-elevator/",
  "https://neal.fun/spend/",
  "https://neal.fun/printing-money/",
  "https://neal.fun/perfect-circle/",
  "https://neal.fun/speed/",
  "https://neal.fun/paper/",
  "https://neal.fun/absurd-trolley-problems/",
  "https://neal.fun/password-game/",
  "https://neal.fun/wonders-of-street-view/",
  "https://neal.fun/earth-reviews/",
  "https://www.omfgdogs.com/",
  "https://corgiorgy.com/",
  "https://corndog.io/",
  "https://alwaysjudgeabookbyitscover.com/",
  "https://www.trashloop.com/",
  "https://www.macaco.tours/",
  "https://www.patience-is-a-virtue.org/",
  "https://pixelsfighting.com/",
  "https://isitwhite.com/",
  "https://onemillionlols.com/",
  "https://www.omglasergunspewpewpew.com/",
  "https://www.dotheharlemshake.com/",
  "https://www.blankwindows.com/",
  "https://www.yesnoif.com/",
  "https://ihasabucket.com/",
  "https://www.partridgegetslucky.com/",
  "https://www.nyan.cat/",
  "https://www.zombo.com/",
  "https://www.fallingfalling.com/",
  "https://www.pointerpointer.com/",
  "https://www.staggeringbeauty.com/",
  "https://www.smashthewalls.com/",
  "https://www.jacksonpollock.org/",
  "https://www.rrrgggbbb.com/",
  "https://www.koalastothemax.com/",
  "https://www.everydayim.com/",
  "https://www.randomcolour.com/",
  "https://www.cat-bounce.com/",
  "https://www.sadforjapan.com/",
  "https://www.taghua.com/",
  "https://www.chrismckenzie.com/",
  "https://www.ninjaflex.com/",
  "https://www.ihasabucket.com/",
  "https://www.corndogoncorndog.com/",
  "https://www.giantbatfarts.com/",
  "https://www.crouton.net/",
  "https://www.electricboogiewoogie.com/",
  "https://www.nelson-haha.com/",
  "https://www.wutdafuk.com/",
  "https://www.unicodesnowmanforyou.com/",
  "https://www.tencents.info/",
  "https://www.intotime.com/",
  "https://www.leekspin.com/",
  "https://www.minecraftinfo.com/",
  "https://www.patience-is-a-virtue.org/"
];

function generateSlug(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\//g, '-').replace(/\./g, '-').replace(/-$/, '');
}

function getTitle(url) {
  let title = url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0].split('.')[0];
  return title.charAt(0).toUpperCase() + title.slice(1);
}

const filePath = path.join(__dirname, 'src', 'lib', 'data.ts');
let txt = fs.readFileSync(filePath, 'utf8');
const match = txt.match(/export const PRO_GAMES_DATA = (\[[\s\S]*\]);\s*$/);

if (match) {
  let items = eval(match[1]);
  
  // Create 100 tool objects
  const newTools = [...new Set(uselessSites)].map((url, i) => {
    const slug = generateSlug(url);
    const domain = url.split('/')[2];
    return {
      title: getTitle(url) + (url.includes('neal.fun') ? ' Fun' : ''),
      url: url,
      thumbnail: `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      category: i % 2 === 0 ? 'Crazy' : 'Timepass',
      type: 'tool',
      slug: slug
    };
  });

  // Filter out duplicates based on slug
  items = items.filter(i => !newTools.find(nt => nt.slug === i.slug));
  
  // Combine
  items.push(...newTools);
  
  const newTxt = 'export const PRO_GAMES_DATA = ' + JSON.stringify(items, null, 2) + ';\n';
  fs.writeFileSync(filePath, newTxt);
  console.log(`Successfully added ${newTools.length} new crazy tools! Total items: ${items.length}`);
} else {
  console.log("Could not parse data.ts");
}
