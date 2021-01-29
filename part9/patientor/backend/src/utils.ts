/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from './types';

////////    Not sure if I should be disabling this rule:   /////////
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        name: parsename(object.name),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn)
    };
    return newPatient;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error(`incorrect or missing date of birth`);
    }
    return dateOfBirth;
};


// --------------------------------  This needs to be ENUM  ---
const parseGender = (gender: any): string => {
    if (!gender || !isString(gender)) {
        throw new Error(`incorrect or missing gender`);
    }
    return gender;
};
//--------------------------------------------------------------


const parsename = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`incorrect or missing name`);
    }
    return name;
};
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`incorrect or missing occupation`);
    }
    return occupation;
};
const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`incorrect or missing ssn`);
    }
    return ssn;
};
