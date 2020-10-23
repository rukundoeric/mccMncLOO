/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import _ from 'lodash';
import data from '../data/mcc-mnc-table.json';

/**
 * @author Rukundo Eric
 * @class mccMncHelper
 * @description this class performs mccMnc related tasks
 */
export default class mccMncHelper {
  constructor() {
    this.mccMncList = data;
  }

  /**
   *
   * @param {Integer} value - value to filter by
   * @returns {Object} - Instance of class
   */
  mcc(value) {
    return this.filter('mcc', value);
  }

  /**
   *
   * @param {Integer} value - value to filter by
   * @returns {Class} - Instance of class
   */
  mnc(value) {
    return this.filter('mnc', value);
  }

  /**
   *
   * @param {Integer} value - value to filter by
   * @returns {Class} - Instance of class
   */
  country(value) {
    return this.filter('country', value);
  }

  /**
   *
   * @param {String} value - key to filter by
   * @param {String} value - value to filter by
   * @returns {Class} - Instance of class
   */
  filter(key, value) {
    const object = {};
    object[key] = `${value}`;
    this.mccMncList = _.filter(this.mccMncList, object);
    return this;
  }

  /**
   *
   * @param {Array} value - Object keys
   * @returns {Object} - Response object
   */
  get(args) {
    const currentList = this.mccMncList;
    if (currentList.length === 0) {
      return -1;
    } if (currentList.length === 1) {
      if (args) {
        return _.pick(currentList[0], ...args);
      }
      return currentList[0];
    }
    if (args) {
      return currentList.map((item) => _.pick(item, ...args));
    }
    return currentList;
  }
}
