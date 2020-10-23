/* eslint-disable camelcase */
import { Router } from 'express';
import mccMncController from '../controllers/mccMnc';
import { verify_token } from '../../middleware';

const {
  get_network_and_country_by_mcc_or_mnc,
  update_json_data,
  get_networks_by_country_or_mcc,
} = mccMncController;
const router = Router();

router.get(
  '/get_network_and_country',
  verify_token,
  get_network_and_country_by_mcc_or_mnc
);

router.get(
  '/get_networks_by_country',
  verify_token,
  get_networks_by_country_or_mcc
);
router.post('/update', update_json_data);

export default router;
