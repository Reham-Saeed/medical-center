export interface Doctor {
  id?: string;
  name: string;
  specialty: string;
  image: string;
  qualifications: string[];
  experience: string;
  schedule: {
    day: string;
    time: string;
  }[];
  phone: string;
  email: string;
  biography: string;
  departmentID: string;
}
