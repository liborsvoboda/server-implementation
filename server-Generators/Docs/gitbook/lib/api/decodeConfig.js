var Config = require('../models/config');

/**
    Decode changes from a JS API to a config object

    @param {Config} config
    @param {Object} result: result from API
    @return {Config}
*/
function decodeGlobal(config, result) {
    var values = result.values;

    delete values.generator;
    delete values.output;

    return Config.updateValues(config, values);
}

module.exports = decodeGlobal;
