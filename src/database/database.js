const config = require("../../config/config.json");
const mongoose = require("mongoose");
const fastifyPlugin = require("fastify-plugin");
const DBURL = config.database.url;

async function mongoConnect(fastify, opts, done) {
  try {
    await mongoose.connect(DBURL, opts);
    fastify.log.info("Connected to database..");
    done();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = fastifyPlugin(mongoConnect);
