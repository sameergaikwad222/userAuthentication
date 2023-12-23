/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */

const headersUserSchema = {
  type: "object",
  properties: {
    apikey: "string",
  },
  required: ["apikey"],
};

const postUserBodyJsonSchema = {
  schema: {
    body: {
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
        contactDetails: {
          type: "obejct",
          properties: {
            email: { type: "string" },
            phoneNumber: { type: "string" },
          },
        },
      },
    },
  },
};

const getUserJsonSchema = {
  type: "object",
  properties: {
    filter: {
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
        contactDetails: {
          type: "obejct",
          properties: {
            email: { type: "string" },
            phoneNumber: { type: "string" },
          },
        },
      },
    },
  },
};

const addUserOptions = {
  body: postUserBodyJsonSchema,
  headers: headersUserSchema,
};

const getUserOption = {
  querystring: getUserJsonSchema,
  headers: headersUserSchema,
};

module.exports = { addUserOptions, getUserOption };
