import patients = require('../../data/patients.json');

type Patient = {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: string,
	occupation: string
};

export const getPatients = (): Patient[] => {
    return patients;
};

