/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */

const headersUserSchema = {
  type: "object",
  properties: {
    apikey: { type: "string" },
  },
  required: ["apikey"],
};

const postUserBodyJsonSchema = {
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
};

const addUserOptions = {
  schema: {
    body: postUserBodyJsonSchema,
    headers: headersUserSchema,
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
};

module.exports = { addUserOptions, getUserOption };
