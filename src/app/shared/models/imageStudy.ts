export interface MainDicomTags {
    acquisitionNumber: string;
    imageOrientationPatient: string;
    imagePositionPatient: string;
    instanceCreationDate: string;
    instanceCreationTime: string;
    instanceNumber: string;
    sopInstanceUID: string;
}

export interface FirstInstanceModel {
    fileSize: number;
    fileUuid: string;
    id: string;
    preview: string;
    file: string;
    indexInSeries: number;
    mainDicomTags: MainDicomTags;
    parentSeries: string;
    type: string;
}

export interface InstancesModel {
    instanceId: string;
    instancePreview: string;
    instanceFile: string;
}

export interface MainDicomTags2 {
    bodyPartExamined: string;
    imageOrientationPatient: string;
    manufacturer: string;
    modality: string;
    performedProcedureStepDescription: string;
    protocolName: string;
    sequenceName: string;
    seriesDate: string;
    seriesDescription: string;
    seriesInstanceUID: string;
    seriesNumber: string;
    seriesTime: string;
}

export interface MainDicomTags3 {
    accessionNumber: string;
    requestedProcedureDescription: string;
    studyDate: string;
    studyDescription: string;
    studyID: string;
    studyInstanceUID: string;
    studyTime: string;
}

export interface PatientMainDicomTags {
    patientBirthDate: string;
    patientID: string;
    patientName: string;
    patientSex: string;
}

export interface ParentStudyModel {
    id: string;
    isStable: boolean;
    lastUpdate: string;
    mainDicomTags: MainDicomTags3;
    parentPatient: string;
    patientMainDicomTags: PatientMainDicomTags;
    series: string[];
    type: string;
}

export interface Series {
    expectedNumberOfInstances?: any;
    id: string;
    instances: string[];
    firstInstanceId: string;
    firstInstancePreview: string;
    firstInstanceModel: FirstInstanceModel;
    firstInstanceFile: string;
    instancesModel: InstancesModel[];
    instancesCount: number;
    isStable: boolean;
    lastUpdate: string;
    mainDicomTags: MainDicomTags2;
    parentStudy: string;
    parentStudyModel: ParentStudyModel;
    status: string;
    type: string;
}

export interface ImageStudy {
    patientName: string;
    studyDate: string;
    series: Series[];
}
