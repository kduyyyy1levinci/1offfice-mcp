export interface OneOfficeBaseResponse<T> {
  error: boolean;
  message?: string;
  data: T;
}

export interface PersonnelProfileData {
  id: number;
  code: string;
  name: string;
  birthday?: string;
  gender?: string;
  mobile?: string;
  email?: string;
  place_home?: string;
  current_address?: string;
  marital_status?: string;
  nationality?: string;
  people?: string;
  religious?: string;
  origin_state?: string;
  place_of_birthday?: string;

  // Job info
  position_id?: number;
  position_title?: string;
  job_title?: string;
  job_title_name?: string;
  department_id?: number;
  job_date_join?: string;
  job_status?: string;
  type_contract?: string;
  work_place?: string;

  // Health info
  blood_group?: string;
  height?: number;
  weight?: number;
  blood_pressure?: string;
  heart_beat?: string;

  // Document info
  private_code?: string;
  passport_code?: string;
  passport_date_expire?: string;
  photo?: string;

  // Management info
  live_manager_id?: number;
  date_created?: string;
  created_by_id?: number;

  // Asset
  asset?: Array<{
    id: number;
    name: string;
    code: string;
    serial?: string;
    status?: string;
  }>;
}


export interface LeaveSummaryItem {
  id: number;
  personnel_id: number;
  start_time: string;
  end_time: string;
  type: string;
  reason: string;
  approved: boolean;
}

export interface LeaveSummaryResponse
  extends OneOfficeBaseResponse<LeaveSummaryItem[]> {}

export interface PersonnelProfileResponse
  extends OneOfficeBaseResponse<PersonnelProfileData> {}
