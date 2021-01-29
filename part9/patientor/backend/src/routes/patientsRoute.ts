import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import { NewPatient } from '../types';

const router = express.Router();
router.get('/', (_req, res) => {
    res.json(patientService.getPatients());
});

router.post('/',(req, res) => {
        try {
            const newPatient: NewPatient = toNewPatient(req.body);
            const addedPatient = patientService.addNewPatient(newPatient);
            res.json(addedPatient);
        } catch (error) {
            console.log(error);
            res.send(400);
        }
    }
);

export default router;
