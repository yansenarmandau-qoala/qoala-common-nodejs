const { libConfigSchema } = require('./config_schema');
const Datadog = require('./lib/datadog');

function getConfig() {
    let config;

    try {
        config = require(process.cwd() + '/src/config/app.config.js');
    } catch (error) {
        console.warn(
            `config is missing`,
            `it should be at work WORK_DIR/src/config/app.config.js`
        );

        return {}
    }

    config = config.hasOwnProperty('getDefaultEnvConfig') && config.getDefaultEnvConfig() || config[process.env.NODE_ENV];

    const { error } = libConfigSchema.validate(config);
    if (error) {
        console.error('[qoala-nodejs-lib] Invalid Config', JSON.stringify(error.details));
        throw new Error("Invalid configuration");
    }

    return config;
}

let datadogInstance;

if (getConfig().datadog) {
    datadogInstance = new Datadog(getConfig().datadog);
}

module.exports = {
    datadog: datadogInstance,
};
