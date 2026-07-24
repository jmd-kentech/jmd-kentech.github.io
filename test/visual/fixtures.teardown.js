const { unstage } = require("./fixtures.stage.js");

module.exports = async function globalTeardown() {
  unstage();
};
