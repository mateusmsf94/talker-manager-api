const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('./talkerValidation');

const { 
  readTalker,
  appendTalker,
  updateTalker,
  deleteTalker } = require('./readAndWrite');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
    const talkerData = await readTalker();
    res.send(talkerData);  
});

app.get('/talker/:id', async (req, res) => {
  const talkerFilePath = path.resolve(__dirname, 'talker.json');
  const json = await fs.readFile(talkerFilePath, 'utf8');
  const data = JSON.parse(json);
  const talker = data.find((talk) => talk.id === Number(req.params.id));
  if (!talker) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.send(talker);    
  }
});

function checkEmail(email) {
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  return emailRegex.test(email); 
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!checkEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const randomString = crypto.randomBytes(8).toString('hex');
  res.send({ token: randomString });
});

app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    await appendTalker(req.body);
    res.status(201).send(req.body);
});

app.put('/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const talker = await updateTalker(req.params.id, req.body);
    res.status(200).send(talker);
  });

  app.delete('/talker/:id', tokenValidation, async (req, res) => {
    await deleteTalker(req.params.id);
    res.status(204).send();
  });