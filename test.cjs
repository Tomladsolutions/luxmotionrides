const https = require('https');

const ids = [
  '1525130413817-d45c1d127c42',
  '1449965408869-eaa3f722e40d',
  '1584036561566-baf8f5f1b144',
  '1519641471654-76ce0107ad1b',
  '1506012787146-f92b2d7d6d96',
  '1549317661-bd32c8ce0db2',
  '1485230405346-71acb9518d9c',
  '1518985283414-ce11bbac0579',
  '1568605117036-5fe5e7bab0b7',
  '1550355291-bbee04a92027',
  '1517026575980-3e1e2def2309',
  '1555353540-64fd8b0ebd50',
  '1609521263047-f8f205293f24',
  '1535713875002-d1d0cf377fde',
  '1438761681033-6461ffad8d80',
  '1623582854588-d60de57fa33f',
  '1636041293178-808a6762ab39',
  '1624561172888-ac93c696e10c'
];

async function check() {
  for (const id of ids) {
    await new Promise(resolve => {
      https.get(`https://images.unsplash.com/photo-${id}?q=80&w=100`, (res) => {
        if (res.statusCode !== 200 && res.statusCode !== 302) {
            console.log(`${id}: ${res.statusCode}`);
        }
        resolve(null);
      }).on('error', () => {
        console.log(`${id}: ERROR`);
        resolve(null);
      });
    });
  }
}

check();
