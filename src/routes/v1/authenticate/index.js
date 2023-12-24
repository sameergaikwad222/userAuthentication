const fastify = require("fastify");
const config = require("../../../../config/config.json");
const User = require("../../../models/Users");
const TOKEN = require("../../../models/Tokens");
const {
  createHashedPassword,
  generateAccessToken,
} = require("../../../helper/genericHelper");

module.exports = async function (fastify, opts) {
  // User Login
  fastify.post("/login", async function (req, reply) {
    const { mobileNo, password } = req.body;
    const mobileReg = /[0-9]{10}/g;
    //Check if invalid mobile
    if (!mobileNo || !mobileReg.test(mobileNo)) {
      return reply.send({
        status: "failed",
        message: "mobile is not valid",
        data: {},
      });
    }
    //Check if invalid password
    if (!password || password === "") {
      return reply.send({
        status: "failed",
        message: "password is not valid",
        data: {},
      });
    }

    const user = await User.findOne({ "contactDetails.phoneNumber": mobileNo });
    //user not found
    if (!user) {
      return reply.send({
        status: "failed",
        message: "No such user found",
        data: {},
      });
    }

    // Comparing password for found user
    const comparePassword = createHashedPassword(password);

    if (comparePassword === user.password) {
      //Delete existing tokens if any
      try {
        await TOKEN.findOneAndDelete({
          identifier: user._id,
        });
      } catch (error) {
        console.log("Error while checking existing tokens", error.message);
      }

      //create JWT token for authenticated user
      const token = generateAccessToken(
        user._id,
        config.tokens.tokensecrete,
        config.tokens.expiry
      );
      const refreshToken = generateAccessToken(
        user._id,
        config.tokens.refreshtokensecrete
      );
      //Inserting token into database
      try {
        const resp = await TOKEN.create({
          identifier: user._id,
          token: token,
          refreshtoken: refreshToken,
        });
        return reply.send({
          status: "success",
          message: "User Auntheticated successfully",
          data: resp,
        });
      } catch (error) {
        console.log(error.message);
        return reply.send({
          status: "failed",
          message: "Error while generating tokens",
          data: {},
        });
      }
    } else {
      return reply.send({
        status: "failed",
        message: "Password doesn't match.",
        data: {},
      });
    }
  });

  // Generate Fresh Token
  fastify.post("/tokens", async function (req, reply) {
    const { token } = req.body;
    //Invalidate the blank or no tokens
    if (!token || token === "") {
      reply.send({
        status: "failed",
        message: "refresh token required",
        data: {},
      });
    }

    try {
      // Find existing refresh token if exists
      const tokenObj = await TOKEN.findOne({
        refreshtoken: token,
      });

      //generate new token if found one
      if (tokenObj && tokenObj?.token) {
        const newtoken = generateAccessToken(
          tokenObj.identifier,
          config.tokens.tokensecrete,
          config.tokens.expiry
        );

        // Updating new Token into database
        await TOKEN.findOneAndUpdate(
          {
            identifier: tokenObj.identifier,
          },
          {
            $set: {
              token: newtoken,
            },
          }
        );

        //share back new token
        return reply.send({
          status: "success",
          message: "Fresh token generated",
          data: {
            token: newtoken,
          },
        });
      } else {
        //send no user found messsage
        return reply.send({
          status: "failed",
          message: "user already might have logged out",
        });
      }
    } catch (error) {
      console.log(
        "Error while fetching token details. Kindly relogin and get one"
      );
      return reply.send({
        status: "failed",
        message: "Error while generating Tokens",
        data: {},
      });
    }
  });

  //Log out User and delete tokens
  fastify.post("/logout", async function (req, reply) {
    const refreshtoken = req.body.token;

    if (!refreshtoken || refreshtoken === "") {
      return reply.send({
        status: "failed",
        message: "No user found for logout",
        data: {},
      });
    }

    try {
      await TOKEN.findOneAndDelete({
        refreshtoken: refreshtoken,
      });
      return reply.send({
        status: "success",
        message: "user successfully logged out",
        data: {},
      });
    } catch (error) {
      console.log("Error while deleting tokens", error.message);
      return reply.send({
        status: "failed",
        message: "Error while logging out",
        data: {},
      });
    }
  });
};
