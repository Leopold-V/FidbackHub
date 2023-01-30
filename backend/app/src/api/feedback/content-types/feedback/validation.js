const Joi = require('joi');

const schemaCreate = Joi.object({
  id: Joi.number(),
  title: Joi.string()
      .min(3)
      .max(128)
      .required(),
  description: Joi.string()
      .min(8)
      .max(1028)
      .required(),
  status: Joi.string().min(3).max(10).required(),
  state: Joi.string().min(3).max(10).required(),
  author_email: Joi.string().required(),
  'type': Joi.string().required(),
  screenshot: Joi.any(),
  user_ipv4: Joi.string().min(7).max(64).required(true),
  projectToken: Joi.string().min(64).max(256).required(true).messages({
    'any.required': `Project token missing!`
  }),
});

const schemaUpdate = Joi.object({
  id: Joi.number(),
  title: Joi.string()
      .min(3)
      .max(128)
      .required(),
  description: Joi.string()
      .min(8)
      .max(1028)
      .required(),
  status: Joi.string().min(3).max(10).required(),
  state: Joi.string().min(3).max(20).required(),
  'type': Joi.string().required(),
  author_email: Joi.string().required(),
  screenshot: Joi.any(),
  user_ipv4: Joi.string().min(7).max(64).required(true),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
  api_key: Joi.string().min(64).max(256).required(true).messages({
    'any.required': `Project token missing!`
  }),
  project: Joi.any(),
});

module.exports = { schemaCreate, schemaUpdate };