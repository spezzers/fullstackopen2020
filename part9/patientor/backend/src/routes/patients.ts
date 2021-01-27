import {getPatients} from '../services/patientService';
import express from 'express';

const router = express.Router();
console.log(getPatients);

router.get('/', (_req, res) => {
    res.json(getPatients());
});

export default router;
