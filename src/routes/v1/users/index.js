const fastify = require("fastify");
const {
  getFilteredUser,
  addMultipleUsers,
  updateMultipleUsers,
  deleteMultipleUsers,
} = require("../../../controllers/userControllers");

module.exports = async function (fastify, options) {
  //GET Requests

  //Get All Users
  fastify.get("/getMutiple", getFilteredUser);

  //Insert Multiple Users
  fastify.put("/addMultiple", addMultipleUsers);

  //Update Users
  fastify.patch("/updateMultiple", updateMultipleUsers);

  //Delete Users
  fastify.delete("/deleteMultiple", deleteMultipleUsers);
};
