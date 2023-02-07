const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) { return res.status(401).send({ message: 'Token não encontrado' }); }
  if (authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) { return res.status(400).send({ message: 'O campo "name" é obrigatório' }); }
  if (name.length < 3) {
    return res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) { return res.status(400).send({ message: 'O campo "age" é obrigatório' }); }
  if (typeof age !== 'number') {
    return res
      .status(400)
      .send({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger(age)) {
    return res
      .status(400)
      .send({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (age < 18) {
    return res
      .status(400)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) { return res.status(400).send({ message: 'O campo "talk" é obrigatório' }); }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) {
 return res
      .status(400)
      .send({ message: 'O campo "watchedAt" é obrigatório' }); 
}
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtRegex.test(watchedAt)) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
 return res
    .status(400)
    .send({ message: 'O campo "rate" é obrigatório' }); 
}
  if (!Number.isInteger(rate) || (rate < 1 || rate > 5)) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
