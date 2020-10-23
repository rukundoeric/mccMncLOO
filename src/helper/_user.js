/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hash_password = (password) => bcrypt.hashSync(password, 8);

const compare_password = (password, compare) => bcrypt.compareSync(password, compare);

const generate_token = async (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const decode_token = async (token) => {
  const user = jwt.verify(token, process.env.SECRET_KEY);
  return user;
};

export {
  hash_password,
  compare_password,
  generate_token,
  decode_token
};
