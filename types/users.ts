// ----------------------------------------------------------------------

export type UserLandlordResponse = IUserItem & {
  housingDetails: Omit<IUserLandlordDetails, 'userId'>;
};

export type UserStudentResponse = IUserItem & {
  studentDetails: Omit<IUserStudentDetails, 'id' | 'userId'>;
};

// ----------------------------------------------------------------------

export type IUserItem = {
  id: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nameExtension: string | null;
  fullName: string;
  dateOfBirth: Date | string;
  gender: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  avatarUrl: string | null;
  createdAt: Date | string | null;
  createdBy: string | null;
  updatedAt: Date | string | null;
  updatedBy: string | null;
  deletedAt: Date | string | null;
  deletedBy: string | null;
};

export type IUserLandlordDetails = {
  id: string;
  userId: string;
  housingName: string;
  chatLink: string | null;
  mapLink: string | null;
};

export type IUserStudentDetails = {
  id: string;
  userId: string;
  studentId: string;
  degree: string;
  department: string;
  college: string;
  housingId: string | null;
  applicationId: string | null;
};

export type IUserAddress = {
  code: string;
  name: string;
};
