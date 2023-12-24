const config = require("../../config/config.json");
const User = require("../models/Users");
const fastify = require("fastify");
const {
  validateFilter,
  createHashedPassword,
} = require("../helper/genericHelper");

const getFilteredUser = async (req, reply) => {
  let filter = req.query?.filter;
  const limit = req.query.limit || 10;
  filter = validateFilter(filter);
  if (!filter) {
    return reply.send({ error: "Filter is required !" });
  }
  try {
    const users = await User.find(filter).limit(limit);
    reply.send(users);
  } catch (error) {
    reply.send({
      error: "No User found",
    });
  }
};

const addMultipleUsers = async (req, reply) => {
  const users = req.body;
  if (users && users.length > 0) {
    //Hashing Users password
    users.forEach((user) => {
      user.password = createHashedPassword(user.password);
    });

    try {
      const result = await User.insertMany(users);
      if (result.length > 0) {
        reply.send({
          msg: "Successfully inserted docs",
          docs: JSON.stringify(result),
        });
      } else {
        reply.send({ msg: "Error while inseting docs" });
      }
    } catch (error) {
      reply.send({ msg: "Error while inseting docs" });
    }
  }
};

const updateMultipleUsers = async (req, reply) => {
  let filter = req.query?.filter;
  const updateUserBody = req.body;
  filter = validateFilter(filter);
  if (!filter) {
    return reply.send({ msg: "Filter is required !!!" });
  }

  try {
    const result = await User.updateMany(filter, { $set: updateUserBody });
    reply.send({ status: "sucess", data: result });
  } catch (error) {
    fastify.log.error(error);
    reply.send({ error });
  }
};

const deleteMultipleUsers = async (req, reply) => {
  let filter = req.query?.filter;
  filter = validateFilter(filter);
  if (!filter) {
    return reply.send({ msg: "filter required !" });
  }

  try {
    const result = await User.deleteMany(filter);
    reply.send({ msg: "Deleted Successfully", data: result });
  } catch (error) {
    reply.send({ error: "Error while deleting docs" });
  }
};

module.exports = {
  getFilteredUser,
  addMultipleUsers,
  updateMultipleUsers,
  deleteMultipleUsers,
};
