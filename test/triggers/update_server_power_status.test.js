/* globals describe, it, expect */
require("should");

const zapier = require("zapier-platform-core");

const App = require("../../index");
const appTester = zapier.createAppTester(App);

describe("Trigger - update_server_power_status", () => {
  zapier.tools.env.inject();

  it("should get an array", async () => {
    const bundle = {
      authData: {
        username: process.env.SAKURACLOUD_ACCESS_TOKEN,
        password: process.env.SAKURACLOUD_ACCESS_TOKEN_SECRET,
      },

      inputData: {
        Zone: "is1a",
      },
    };

    const results = await appTester(
      App.triggers["update_server_power_status"].operation.perform,
      bundle
    );
    results.should.be.an.Array();
  });
});
