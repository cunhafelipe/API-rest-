const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
  firstName: Joi.string().optional(),
  admin: Joi.boolean().default(false).optional(),
});

module.exports = userSchema;
