import express from 'express';
import userRouter from './_user';
import mccMncRouter from './_mccMnc';

const api = express();

api.use('/user', userRouter);
api.use('/mccmnc', mccMncRouter);

export default api;