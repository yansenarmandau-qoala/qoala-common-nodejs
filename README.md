# Qoala NodeJS Development Kit
Development kit includes:
- Datadog Integration

### Datadog Integration
Config injection for datadog integration instance.

Methods:
1. sendIncrement
2. sendHistogram

**Required Config**
Config location: WORK_DIR/src/app.config.js

Format:
```
module.exports = {
    development: {
        datadog: {
            host: <String>
            port: <Number>
            env: <String>
            prefix: <String>
        }
    },
    test: { .... },
    production: { ... }
    getDefaultEnvConfig() {
        return this[process.env.NODE_ENV || 'development'];
    }
}
```

### Usage

**Datadog**
```
const { datadog } = require('qoala-common-nodejs');

// Send increment with tags
datadog.sendIncrement('metric_name', 1, ['tags1', 'tags2'])

// send histrogram with tags
datadog.sendHistogram('my_histogram', 42, ['tags1', 'tags2'])
```
