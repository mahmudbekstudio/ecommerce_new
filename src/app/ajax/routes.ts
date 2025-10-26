import express, { Router } from 'express';

const router: Router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.json({test: 'Test JSON'});
});

export default router;