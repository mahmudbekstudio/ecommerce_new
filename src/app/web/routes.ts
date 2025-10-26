import express from 'express';
import Home from './controller/Home';

const router = express.Router();

router.get('/', (new Home).execute);

export default router;