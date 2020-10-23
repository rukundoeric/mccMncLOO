/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import {
  saveUser,
  hash_password,
  compare_password,
  generate_token,
} from '../../helper/index';
import users from '../../data/users.json';

/**
 * @author Rukundo Eric
 * @class userController
 * @description this class performs the whole mccMnc related tasks
 */
export default class userController {
  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async signup(req, res) {
    let { name, email, password } = req.body;

    password = hash_password(`${password}`);
    let user = {
      name,
      email,
      password,
    };
    users.push(user);
    let result = await saveUser(users);
    res.status(result.status).send({
      ...result,
    });
  }

  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async signin(req, res) {
    let { password } = req.body;

    const { user } = req.userData;
    let comparePasswordResult = compare_password(password, user.password);

    if (comparePasswordResult) {
      let token = await generate_token(user);
      return res.status(200).send({
        status: 201,
        data: {
          message: 'Logged In Successfully!',
          token,
        }
      });
    }
    return res.status(400).send({
      status: 400,
      data: {
        message: 'Wrong password!',
      },
    });
  }
}
