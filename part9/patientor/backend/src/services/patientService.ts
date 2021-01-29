import patients = require('../../data/patients.json');
import { NewPatient, Patient, PatientSensitiveInfo } from '../types';

    const getPatientsSensitiveInfo = (): PatientSensitiveInfo[] => {
        return patients;
    };
    
    const getPatients = (): Patient[] => {
        return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
    };

    const addNewPatient = (newPatientObject: NewPatient): Patient => {
        const newPatient: PatientSensitiveInfo = {...newPatientObject, id: `${Math.floor(Math.random() * 1000000000000000 )}`};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {ssn, ...newSensitivePatient} = newPatient;
        return {...newSensitivePatient};
    };

export default {getPatients, getPatientsSensitiveInfo, addNewPatient};