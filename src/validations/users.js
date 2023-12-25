/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */

const { Schema } = require("mongoose");
const { checkAuthorization } = require("../../middleware/auth");

const headersUserSchema = {
  type: "object",
  properties: {
    apikey: { type: "string" },
  },
  required: ["apikey"],
};

const addUserOptionBody = {
  type: "array",
  items: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      age: { type: "number" },
      password: { type: "string" },
      locationDetails: {
        type: "object",
        properties: {
          countryName: { type: "string" },
          countryCode: { type: "string" },
          phoneCode: { type: "string" },
          area: { type: "string" },
        },
      },
    },
    required: ["firstName", "lastName", "age", "password", "locationDetails"],
  },
};

const addUserOptions = {
  schema: {
    body: addUserOptionBody,
  },
};

const getUserOption = {
  schema: {
    query: {
      type: "object",
      properties: {
        filter: {
          type: "string",
        },
      },
    },
    headers: headersUserSchema,
  },
  preHandler: checkAuthorization,
};

module.exports = { addUserOptions, getUserOption };
