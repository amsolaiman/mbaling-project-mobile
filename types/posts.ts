import { UserLandlordResponse } from './users';

// ----------------------------------------------------------------------

export type PostResponse = Omit<IPostItem, 'housingId'> & {
  uploads: Omit<IPostUploads, 'postId'>[];
  landlordDetails: Omit<
    UserLandlordResponse,
    'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy' | 'deletedAt' | 'deletedBy'
  >;
};

// ----------------------------------------------------------------------

export type IPostItem = {
  id: string;
  housingId: string;
  title: string;
  description: string;
  price: number;
  isVisible: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
};

export type IPostUploads = {
  id: string;
  postId: string;
  imgUrl: string;
};

export type UploadFormValue = {
  uri: string;
  name: string;
  type: string;
};
