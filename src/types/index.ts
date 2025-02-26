export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
}

export interface LoanRequest {
  loanAmount: number;
  upfrontPayment: number;
  terms: number;
}

export interface FinancialInfo {
  monthlySalary: number;
  additionalIncome?: number;
  mortgage?: number;
  otherCredits?: number;
}

export interface WizardFormData {
  personalInfo: PersonalInfo;
  contactDetails: ContactDetails;
  loanRequest: LoanRequest;
  financialInfo: FinancialInfo;
}
