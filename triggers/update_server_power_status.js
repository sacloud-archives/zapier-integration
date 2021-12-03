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
      v.originalId = v.ID;
      v.id = z.hash("md5", v.ID + v.Instance.StatusChangedAt);
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
  key: "update_server_power_status",
  noun: "Server",
  display: {
    label: "Update Server Power Status",
    description: "Triggers when server's power status is updated.",
    hidden: false,
    important: true,
  },
};
