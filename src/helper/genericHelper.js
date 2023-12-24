const crypto = require("crypto");
var jwt = require("jsonwebtoken");
const config = require("../../config/config.json");
const SECRETEKEY = config.password.secreteKey;

const validateFilter = function (filter = "") {
  if (!filter || filter == "") {
    return undefined;
  }

  try {
    filter = JSON.parse(filter);
    const isInvalidFilter = Object.keys(filter).some((key) => {
      return ![
        "firstName",
        "lastName",
        "age",
        "contactDetails",
        "locationDetails",
        "statusId",
      ].includes(key);
    });
    if (isInvalidFilter) {
      return undefined;
    }
    return filter;
  } catch (error) {
    return undefined;
  }
};

function createHashedPassword(plainPassword) {
  if (!plainPassword || plainPassword.length === "") {
    return undefined;
  }
  let hash = crypto.createHmac("sha256", SECRETEKEY);
  return hash.update(plainPassword).digest("hex");
}

function generateAccessToken(id, secreteValue, expiry) {
  if (!id) {
    return { undefined, undefined };
  }
  let token;
  if (expiry) {
    token = jwt.sign({ identifier: id }, secreteValue, {
      expiresIn: config.tokens.expiry,
    });
  } else {
    token = jwt.sign({ identifier: id }, secreteValue);
  }

  return token;
}

module.exports = { validateFilter, createHashedPassword, generateAccessToken };
