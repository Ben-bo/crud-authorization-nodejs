const joi = require("joi");
const jwt = require("jsonwebtoken");
const authorization = {
  authAdmin: async (req, res, next) => {
    try {
      const dataUser = req.body.decodedToken;
      if (dataUser.isAdmin) {
        next();
      } else {
        res.send({ error: "user not allowed" });
      }
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "invalid token",
        data: error,
      });
    }
  },
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const schema = joi
        .object({
          authorization: joi.string().required(),
        })
        .options({
          abortEarly: false,
        });
      const validate = await schema.validate({ authorization: token });
      if (validate.error) {
        res.send({
          error: validate.error.message,
          sugest: "please login",
        });
      } else {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body.decodedToken = decodedToken;
        next();
      }
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "invalid token",
        data: error,
      });
    }
  },
  authValidation: async (req, res, next) => {
    try {
      const body = {
        email: req.body.email,
        password: req.body.password,
      };
      const schema = joi
        .object({
          email: joi.string().email().required(),
          password: joi.string().required(),
        })
        .options({ abortEarly: false });
      const validate = await schema.validate(body);
      if (validate.error) {
        res.send({
          erorr: validate.error.message,
        });
      } else {
        next();
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "somthing wrong",
        data: error,
      });
    }
  },
};
module.exports = authorization;
