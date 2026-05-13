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

export interface IContactFormData{
  fullName: string;
  phone: string;
  email: string;
  message: string;
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