const config = require("../../config/config.json");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const SECRETEKEY = config.password.secreteKey;
const defaultPass = config.password.default;

let hash = crypto.createHmac("sha256", SECRETEKEY);

const locationWrapper = new Schema(
  {
    countryName: {
      type: String,
      default: "India",
      required: true,
    },
    countryCode: {
      type: String,
      default: "IND",
      required: true,
    },
    phoneCode: {
      type: String,
      default: "91",
      required: true,
    },
    area: {
      type: String,
      default: "Mumbai,400001",
      required: false,
    },
  },
  { _id: false }
);

const contactWrapper = new Schema(
  {
    email: {
      type: String,
      default: "default_email@domain.com",
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "9892098920",
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "default",
      required: true,
    },
    lastName: {
      type: String,
      default: "person",
      required: true,
    },
    age: {
      type: Number,
      default: 21,
      required: true,
    },
    contactDetails: {
      type: contactWrapper,
      default: {
        email: "default_email@domain.com",
        phoneNumber: "9892098920",
      },
      required: true,
    },
    locationDetails: {
      type: locationWrapper,
      default: {
        countryName: "India",
        countryCode: "IND",
        phoneCode: "91",
        area: "Mumbai 400001",
      },
      required: false,
    },
    password: {
      type: String,
      default: hash.update(defaultPass).digest("hex"),
      required: true,
    },
    statusId: {
      type: Number,
      default: 1,
      required: true,
    },
    createdAt: {
      type: String,
      default: new Date(),
      required: false,
    },
    updatedAt: {
      type: String,
      default: new Date(),
      required: false,
    },
  },
  { _id: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
