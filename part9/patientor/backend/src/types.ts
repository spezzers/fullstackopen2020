export interface PatientSensitiveInfo {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}
export type Patient = Omit<PatientSensitiveInfo, 'ssn'>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
