const {
  config: authentication,
  befores = [],
  afters = [],
} = require("./authentication");
const newServerTrigger = require("./triggers/new_server.js");
const updateServerPowerStatusTrigger = require("./triggers/update_server_power_status.js");

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  authentication,

  beforeRequest: [...befores],

  afterResponse: [...afters],

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [newServerTrigger.key]: newServerTrigger,
    [updateServerPowerStatusTrigger.key]: updateServerPowerStatusTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {},
};
