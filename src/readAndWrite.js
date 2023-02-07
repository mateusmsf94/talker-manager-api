const fs = require('fs/promises');
const path = require('path');

const talkerFilePath = path.resolve(__dirname, 'talker.json');
async function readTalker() {
  const data = await fs.readFile(talkerFilePath, 'utf8');
  return JSON.parse(data);
}

async function appendTalker(Talker) {
  const data = await fs.readFile(talkerFilePath, 'utf8');
  const talkers = JSON.parse(data);
  const newTalker = Talker;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  await fs.writeFile(talkerFilePath, JSON.stringify(talkers));
}

async function updateTalker(id, updatedTalker) {
  const talkers = await readTalker();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  // const talker = talkers[talkerIndex];
  const updatedTalkerData = { id: Number(id), ...updatedTalker };
  talkers[talkerIndex] = updatedTalkerData;
  await fs.writeFile(talkerFilePath, JSON.stringify(talkers));
  return updatedTalkerData;
}

module.exports = { readTalker, appendTalker, updateTalker };