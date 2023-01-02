const Joi = require('joi');

const schemaCreate = Joi.object({
  name: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),
  website_url: Joi.string().uri().required(),
  github_url: Joi.string().uri().required(),
  api_key: Joi.string().min(64).max(256).required(),
  user: Joi.number().required()
});

const schemaUpdate = Joi.object({
  id: Joi.number().required(),
  name: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),
  website_url: Joi.string().uri().required(),
  github_url: Joi.string().uri().required(),
  api_key: Joi.string().min(64).max(256).required(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
  user: Joi.any(),
  feedbacks: Joi.any()
});

module.exports = { schemaCreate, schemaUpdate };
