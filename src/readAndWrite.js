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
  const updatedTalkerData = { id: Number(id), ...updatedTalker };
  talkers[talkerIndex] = updatedTalkerData;
  await fs.writeFile(talkerFilePath, JSON.stringify(talkers));
  return updatedTalkerData;
}

async function deleteTalker(id) {
  let talkers = await readTalker();
  talkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(talkerFilePath, JSON.stringify(talkers));
}

async function searchTalker(name) {
  const talkers = await readTalker();
  if (!name) return talkers;
  return talkers.filter((talker) => talker.name.includes(name));
}

module.exports = { readTalker, appendTalker, updateTalker, deleteTalker, searchTalker };