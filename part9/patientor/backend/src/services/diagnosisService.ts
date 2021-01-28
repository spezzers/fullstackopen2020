import diagnoses = require('../../data/diagnoses.json');
import {Diagnosis} from '../types';

export const getDiagnoses = (): Diagnosis[] => {
	return diagnoses;
};