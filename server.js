const fastify = require("fastify")({ logger: true });
const path = require("path");
const { default: mongoose } = require("mongoose");
const config = require("./config/config.json");
const autoload = require("@fastify/autoload");
const PORT = config.PORT;

module.exports = async function (fastify, opts) {
  // Run the Server
  try {
    fastify.addHook("onClose", (_instance, done) => {
      mongoose.connection.close(false, () => {
        fastify.log.info("Mongo DB connection closed");
      });
      done();
    });
    // Registering Plugins Here
    fastify.register(require("./src/database/database"));
    fastify.register(autoload, {
      dir: path.join(__dirname, "src", "routes"),
    });
    fastify.log.info("server started..");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
