const fastify = require("fastify");
const { checkAuthorization } = require("../../../../middleware/auth");
const path = require("path");
const {
  getFilteredUser,
  addMultipleUsers,
  updateMultipleUsers,
  deleteMultipleUsers,
} = require("../../../controllers/userControllers");

const { addUserOptions, getUserOption } = require("../../../validations/users");

module.exports = async function (fastify, options) {
  //GET Requests

  //Get All Users
  fastify.get(
    "/getMutiple",
    getUserOption,
    getFilteredUser
  );

  //Insert Multiple Users
  fastify.put("/addMultiple", addUserOptions, addMultipleUsers);

  //Update Users
  fastify.patch(
    "/updateMultiple",
    { preHandler: checkAuthorization },
    updateMultipleUsers
  );

  //Delete Users
  fastify.delete(
    "/deleteMultiple",
    { preHandler: checkAuthorization },
    deleteMultipleUsers
  );
};
