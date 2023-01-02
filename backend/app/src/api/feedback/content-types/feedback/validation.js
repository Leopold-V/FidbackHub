const Joi = require('joi');

const schemaCreate = Joi.object({
  title: Joi.number()
      .min(3)
      .max(128)
      .required(),
  description: Joi.number()
      .min(8)
      .max(1028)
      .required(),
  status: Joi.any().required(),
  author_email: Joi.string().required(),
  screenshot: Joi.any(),
  user_ipv4: Joi.string().min(7).max(64).required(true),
  projectToken: Joi.string().min(64).max(256).required(true).messages({
    'any.required': `Project token missing!`
  }),
});

module.exports = { schemaCreate };
