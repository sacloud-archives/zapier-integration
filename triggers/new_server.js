const Fields = require("../fields");

const perform = async (z, bundle) => {
  const options = {
    url: `https://secure.sakura.ad.jp/cloud/zone/${bundle.inputData.Zone}/api/cloud/1.1/server`,
    method: "GET",
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    return results.Servers.map((v) => {
      v.id = v.ID;
      return v;
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: "Zone",
        type: "string",
        label: "Zone",
        choices: Fields.zoneChoices,
        required: true,
        list: false,
        altersDynamicFields: true,
      },
    ],
    outputFields: [],
  },
  key: "new_server",
  noun: "Server",
  display: {
    label: "New Server",
    description: "Triggers when a new server is created.",
    hidden: false,
    important: true,
  },
};
