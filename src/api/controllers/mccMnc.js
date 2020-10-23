/* eslint-disable camelcase */
import _ from 'lodash';
import { mccMncHelper, saveDataFromMccMnc } from '../../helper/index';

/**
 * @author Rukundo Eric
 * @class mccMncController
 * @description this class performs the whole mccMnc related tasks
 */
export default class mccMncController {
  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async get_network_and_country_by_mcc_or_mnc(req, res) {
    const { mcc, mnc } = req.query;

    const result = new mccMncHelper()
      .mcc(mcc)
      .mnc(mnc)
      .get(['country', 'network']);

    res.status(200).send({
      status: 200,
      data: {
        ...result,
      },
    });
  }

  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async get_networks_by_country_or_mcc(req, res) {
    const { mcc, country } = req.query;

    const mcc_result = mcc ? new mccMncHelper()
      .mcc(mcc)
      .get(['network']) : [];
    const country_result = country ? new mccMncHelper().country(country).get(['network']) : [];
    let result = _.uniqWith([...mcc_result, ...country_result], _.isEqual);
    result = result.map((item) => item.network);

    res.status(200).send({
      status: 200,
      data: {
        ...result,
      },
    });
  }

  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async update_json_data(req, res) {
    const page_url = 'https://www.mcc-mnc.com/';
    const result = await saveDataFromMccMnc(page_url);
    res.status(result.status).send({
      ...result,
    });
  }
}
