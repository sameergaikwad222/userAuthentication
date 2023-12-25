const { TOKEN } = require("../src/models/Tokens");
var jwt = require("jsonwebtoken");
const config = require("../config/config.json");

const checkAuthorization = function (request, reply, done) {
  let token;
  const tokenPart = request.headers["apikey"];
  if (tokenPart && tokenPart !== "") {
    token = tokenPart.split(" ")[1];
  } else {
    token = undefined;
  }

  if (!token || token === "") {
    return reply.code(401).send({
      status: "failed",
      message: "Unauthorized",
      data: {},
    });
  }
  try {
    const decoded = jwt.verify(token, config.tokens.tokensecrete);
    const identifier = decoded.identifier;
    request.headers.identifier = identifier;
    done();
  } catch (error) {
    console.log(error.message);
    return reply.code(401).send({
      status: "failed",
      message: "Unauthorized.Token Expired",
      data: {},
    });
  }
};

module.exports = { checkAuthorization };
