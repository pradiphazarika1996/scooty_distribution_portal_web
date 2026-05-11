export interface Step {
  key: string;
  label: string;
  step: number;
}

export interface PersonalDetails {
  applicantName: string;
  parentGuardianName: string;
  gender: string;
  dateOfBirth: string;
  caste: string;
  macConstituencyName: string;
  macConstituencyNo: string;
  state: string;
  city: string;
  district: string;
  constituency: string;
  panchayat: string;
  village: string;
  pinCode: string;
  aadhaarNumber: string;
  phoneNumber: string;
  emailId: string;
  password: string;
}

export interface AcademicDetails {
  examinationPassed: string;
  yearOfPassing: string;
  boardName: string;
  rollNo: string;
  percentageOfMarks: string;
  institutionName: string;
  institutionAddress: string;
}

export interface BankDetails {
  bankName: string;
  branchName: string;
  accountNo: string;
  ifscCode: string;
}

export interface DocumentFile {
  uid: string;
  name: string;
  status: string;
  url?: string;
  originFileObj?: File;
}

export interface Documents {
  govtId: DocumentFile[];
  marksheet: DocumentFile[];
  ageProof: DocumentFile[];
  addressProof: DocumentFile[];
  schoolPassCertificate: DocumentFile[];
  bankPassBook: DocumentFile[];
  casteCertificate: DocumentFile[];
  bankAccountDetails: DocumentFile[];
}

export interface ScholarshipFormData {
  personalDetails: PersonalDetails;
  academicDetails: AcademicDetails;
  bankDetails: BankDetails;
  documents: Documents;
}
