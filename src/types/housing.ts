import { UserLandlordResponse } from './users';

// ----------------------------------------------------------------------

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
