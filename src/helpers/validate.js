const Joi = require("joi");

const createValidator = (schema) => {
  (payload) => {
    return Joi.valid(payload, schema, {
      abortEarly: false,
    });
  };
};

module.exports = createValidator;
