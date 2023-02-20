const Joi = require('joi');

const schemaCreate = Joi.object({
  id: Joi.number(),
  content: Joi.string()
      .min(8)
      .max(1028)
      .required(),
  author: Joi.string().required(),
  feedback: Joi.any(),
});

module.exports = { schemaCreate };
