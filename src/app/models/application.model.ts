export interface Application {
  id: string;
  service: string;
  applicant: string;
  dateSubmitted: string;
  office: string;
  processingDeadline: string;
  isOverdue: boolean;
  status: 'pending_processing' | 'approved' | 'rejected' | 'escalated';
  details?: ApplicationDetails;
}

export interface ApplicationDetails {
  personalDetails: {
    nationalId: string;
    name: string;
  };
  residenceDetails: {
    district: string;
    sector: string;
  };
  birthInformation: {
    countryOfBirth: string;
    cityOfBirth: string;
    dateOfBirth: string;
  };
  passportDetails: {
    passportType: string;
    passportValidity: string;
    purposeOfTravel: string;
    destinationCountry: string;
    destinationCity: string;
  };
  attachments: Attachment[];
}

export interface Attachment {
  name: string;
  size: string;
}
