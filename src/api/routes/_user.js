/* eslint-disable camelcase */
import { Router } from 'express';
import userController from '../controllers/user';
import { user_not_exist, is_user_exist } from '../../middleware/index';

const { signin, signup } = userController;

const router = Router();

router.post('/signup', user_not_exist, signup);
router.post('/signin', is_user_exist, signin);

export default router;
