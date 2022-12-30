const Joi = require('joi');

const schemaCreate = Joi.object({
  design: Joi.number()
      .min(0)
      .max(10)
      .required(),
  speed: Joi.number()
      .min(0)
      .max(10)
      .required(),
  responsive: Joi.number()
      .min(0)
      .max(10)
      .required(),
  average: Joi.number()
      .min(0)
      .max(10)
      .required(),
  user_ipv4: Joi.string().min(7).max(64).required(true),
  projectToken: Joi.string().min(64).max(256).required(true).messages({
    'any.required': `Project token missing!`
  }),
});

module.exports = { schemaCreate };
