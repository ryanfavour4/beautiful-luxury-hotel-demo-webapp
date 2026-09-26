export interface IUserProfile {
  kycStatus: {
    status: string;
  };
  wallet: {
    bonus: number;
  };
  _id: string;
  email: string;
  userId: string;
  fullName: string;
  avatar: string;
  country: string;
  emailVerified: boolean;
  phone: string;
  googleId?: string;
  referredBy?: string;
  guest?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  gender: string
  postalCode: string
  address: string
  dateOfBirth: string
  firstName?: string;
  lastName?: string;
  state?: string;
  city?: string;
}

export interface IAuthStore {
  user: IUserProfile | null;
  token: string | null;
}
