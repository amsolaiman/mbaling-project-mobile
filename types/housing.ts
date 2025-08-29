import { UserLandlordResponse, UserStudentResponse } from './users';

// ----------------------------------------------------------------------

export type HousingApplicantResponse = IApplicationItem & {
  studentDetails: UserStudentResponse;
};

export type HousingTenantResponse = UserStudentResponse;

export type StudentApplicationResponse = IApplicationItem & {
  housingDetails: UserLandlordResponse;
};

export type StudentHousingResponse = UserLandlordResponse;

// ----------------------------------------------------------------------

export type IApplicationItem = {
  id: string;
  housingId: string;
  createdAt: Date | string | null;
  createdBy: string;
};
