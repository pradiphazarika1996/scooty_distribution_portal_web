export interface IStatItem {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

export interface IFeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface IContactFormData {
  fullName: string;
  phone: string;
  email?: string;
  message: string;
  recaptchaToken: string;
}

interface IEligibilityCriteria {
  text: string;
}
export interface IScheme {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  eligibility: IEligibilityCriteria[];
  applyLink: string;
}

export interface IContact {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  message: string;
  created_at: string;
}

export interface IGetContactsResponse {
  status: boolean;
  data: IContact[];
}