/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import users from '../data/users.json';

export const user_not_exist = (req, res, next) => {
  const { email } = req.body;
  const result = users.filter((item) => item.email === email);

  if (result.length > 0) {
    return res.status(400).send({
      status: 400,
      error: {
        message: `User with this email ${email} already exist!`,
      },
    });
  }
  next();
};

export const is_user_exist = (req, res, next) => {
  const { email } = req.body;
  const result = users.filter((item) => item.email === email);

  if (result.length <= 0) {
    return res.status(404).send({
      status: 404,
      error: {
        message: `User with this email ${email} not exist!`,
      },
    });
  }
  const userData = {};
  userData.user = result[0];
  req.userData = userData;
  next();
};
