const Joi = require('joi');

const datadogConfigSchema = Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    env: Joi.string().required(),
    prefix: Joi.string(),
});

const libConfigSchema = Joi.object({
    datadog: datadogConfigSchema,
}).unknown(true); // allow other items

module.exports = {
    libConfigSchema
};