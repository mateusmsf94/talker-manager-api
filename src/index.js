const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

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
    const talkerFilePath = path.resolve(__dirname, 'talker.json');
    const data = await fs.readFile(talkerFilePath, 'utf8');
    res.send(JSON.parse(data));  
});

app.get('/talker/:id', async (req, res) => {
  const talkerFilePath = path.resolve(__dirname, 'talker.json');
  const json = await fs.readFile(talkerFilePath, 'utf8');
  console.log(typeof json);
  const data = JSON.parse(json);
  console.log(data.find((t) => t.id === 1));
  const talker = data.find((talk) => talk.id === Number(req.params.id));
  if (!talker) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.send(talker);    
  }
});

// a function to generate a 16 character random string

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const randomString = crypto.randomBytes(8).toString('hex');
  res.send({ token: randomString });
});