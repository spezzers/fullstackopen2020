import patients = require('../../data/patients.json');
import { Patient, PatientSensitiveInfo } from '../types';

export const getPatientsSensitiveInfo = (): PatientSensitiveInfo[] => {
    return patients;
};

export const getPatients = (): Patient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
