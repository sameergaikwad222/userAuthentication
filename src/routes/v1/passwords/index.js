const fastify = require("fastify");
module.exports = async function (fastify, opts) {
  fastify.get("/", async function (req, reply) {
    reply.send({ test: "success" });
  });
};
