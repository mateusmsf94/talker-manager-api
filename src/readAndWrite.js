const fs = require('fs/promises');
const path = require('path');

async function readTalker() {
  const talkerFilePath = path.resolve(__dirname, 'talker.json');
  const data = await fs.readFile(talkerFilePath, 'utf8');
  return JSON.parse(data);
}

async function appendTalker(Talker) {
  const talkerFilePath = path.resolve(__dirname, 'talker.json');
  const data = await fs.readFile(talkerFilePath, 'utf8');
  const talkers = JSON.parse(data);
  const newTalker = Talker;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  await fs.writeFile(talkerFilePath, JSON.stringify(talkers));
}

module.exports = { readTalker, appendTalker };