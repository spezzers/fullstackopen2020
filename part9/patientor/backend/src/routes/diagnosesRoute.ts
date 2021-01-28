import {getDiagnoses} from '../services/diagnosisService';
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
	res.json(getDiagnoses());
});

export default router;