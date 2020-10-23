/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import users from '../data/users.json';

export const verify_token = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({
      status: 401,
      error: {
        message: 'Token is mmissing!!',
      },
    });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = users.filter((item) => item.email === decode.email);

    if (!user) {
      return res.status(401).send({
        status: 401,
        error: {
          message: 'Token is invalid',
        },
      });
    }
    const data = {};
    data.token = token;
    data.user = user;
    req.userData = data;
    return next();
  } catch (error) {
    if (error.name && error.name === 'TokenExpiredError') {
      return res.status(401).send({
        status: 401,
        error: {
          message: error.message,
        },
      });
    }
    return res.status(500).send({
      status: 500,
      error: `${error}`,
    });
  }
};
