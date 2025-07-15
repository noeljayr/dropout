export interface QUERY_TYPES {
  setIsLoading: (state: boolean) => void;
  setIsError: (state: boolean) => void;
  setResponseMessage: (message: string) => void;
}

export interface LOGIN extends QUERY_TYPES {
  setIsSuccess: (state: boolean) => void;
  username: string;
  password: string;
}

export interface GET_CLASSES extends QUERY_TYPES {
  setData: (data: any) => void;
  academic_year?: string;
  include_performance?: false;
  is_active?: true;
}

export interface GET_STUDENTS extends QUERY_TYPES {
  setData: (data: any) => void;
  limit?: number;
  id?: string;
}

export interface CREATE_STUDENT extends QUERY_TYPES {
  setIsSuccess: (state: boolean) => void;
  student_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO date string (e.g., "2025-07-14")
  gender: string;
  home_address: string;
  distance_to_school: number;
  transport_method: string;
  enrollment_date: string; // ISO date string
  special_learning: boolean;
  textbook_availability: boolean;
  class_repetitions: number;
  household_income: string;
  guardian_id: string; // UUID
  class_id: string;
}

export interface NEW_PREDICTIONS extends QUERY_TYPES {
  setIsSuccess: (state: boolean) => void;
  student_id: string;
  term_avg_score: number;
  school_attendance_rate: number;
  bullying_incidents_total: number;
  class_repetitions: number;
  distance_to_school: number;
  special_learning: boolean;
  household_income: string;
  orphan_status: string;
  standard: number;
  age: number;
  gender: string;
}

type scores = {
  subject_id: string;
  score: number;
  grade: string;
};

export interface NEW_REPORT extends QUERY_TYPES {
  setIsSuccess: (state: boolean) => void;
  student_id: string;
  academic_year: string;
  term_type: 'term1';
  standard: 1;
  present_days: number;
  absent_days: number;
  subject_scores: scores[];
  remarks: string;
}
