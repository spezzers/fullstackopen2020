import patients = require('../../data/patients.json');
import {Patient} from '../types';


export const getPatients = (): Patient[] => {
    
    return patients;
};

