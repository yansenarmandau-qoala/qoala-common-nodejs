const { StatsD } = require('hot-shots');

/**
 * Config:
 * - datadog: { host, port, env, prefix }
 */
class Datadog {
    constructor(datadogConfig) {
        const { host, port, env, prefix } = datadogConfig;

        this.ddClient = new StatsD({
            host,
            port,
            prefix,
            globalTags: [`env:${env}`],
            errorHandler: (error) => {
                console.error('[qoala-nodejs-lib][datadog] Socket errors caught here', error);
            }
        })
    }

    sendIncrement(metricName, value, tags) {
        return this.ddClient.increment(metricName, value, tags);
    }

    sendHistogram(metricName, value, tags) {
        return this.ddClient.histogram(metricName, value, tags);
    }
};

module.exports = Datadog;
