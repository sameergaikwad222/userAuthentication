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
    await fastify.register(require("@fastify/swagger"), {
      swagger: {
        info: {
          title: "User Aunthentication",
          description: "User Aunthentication Fastify swagger API",
          version: "0.1.0",
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
        host: "localhost",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "user", description: "/getMutiple,/addMultiple" }],
        definitions: {
          User: {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "string", format: "uuid" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              age: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              statusId: { type: "number" },
            },
          },
        },
        exposeRoute: true,
      },
    });

    fastify.log.info("server started..");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
