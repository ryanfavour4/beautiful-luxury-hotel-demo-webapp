import { AxiosResponse } from "axios";
import { bookingStatusEnum } from "../services/types";

export type T_ApiResponse<T = unknown> = AxiosResponse<T>;

export interface IUseRegisterRes {
  status: number;
  message: string;
  data: IUseRegisterData;
}

export interface IUseRegisterData {
  id: string;
  email: string;
  userId: string;
  fullName: string;
  emailVerified: boolean;
  phone: string;
  avatar: null;
  createdAt: string;
  token: string;
}

export interface IUseLoginRes {
  status: number;
  message: string;
  user: IUseGetUserResUser;
}

export interface Wallet {
  exchange: number;
  trade: number;
  bonus: number;
}

export interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  read: boolean;
  user: string;
  createdAt: string;
}

export interface IUseGetUserRes {
  user: IUseGetUserResUser;
}

export interface IUseGetUserResUser {
  kycStatus: IUseGetUserResUserKycStatus;
  wallet: IUseGetUserResUserWallet;
  _id: string;
  email: string;
  userId: string;
  fullName: string;
  avatar: string;
  country: string;
  emailVerified: boolean;
  phone: string;
  googleId: string;
  referredBy: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
  gender: string;
  postalCode: string;
  address: string;
  dateOfBirth: string;
}

export interface IUseGetUserResUserKycStatus {
  status: string;
}

export interface IUseGetUserResUserWallet {
  bonus: number;
}
export interface UpdateProfileResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    userId: string;
    fullName: string;
    avatar: string;
    avatarUploadId: string;
    country: string;
    emailVerified: boolean;
    phone: string;
    googleId?: string;
    referredBy?: string;
    role: "user" | "admin" | "superadmin";
    wallet: Wallet;
    kycStatus: KycStatus;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
    lastLoginIp?: string;
    __v: number;
    gender: string;
    postalCode: string;
    address: string;
    dateOfBirth: string;
  };
}
export interface KycStatus {
  status: "pending" | "approved" | "rejected";
  fullName: string;
  nationality: string;
  documentType: string;
  documentNumber: string;
  documentPhoto: MediaFile;
  selfiePhoto: MediaFile;
  updatedAt: string;
}
export interface MediaFile {
  _id: string;
  url: string;
  publicId: string;
  assetId: string;
  type: string;
  resourceType: "image" | "video";
  ownerId: string;
  ownerModel: "User";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UploadFormData {
  files: File;
  type: "profile" | "kyc-selfie-image" | "kyc-document-image" | "kyc-document";
}

// ======== !! ROOM TYPES
export interface IGetAllRoomsTypesRes {
  message: string;
  data: IGetAllRoomsTypesResData[];
  pagination: Pagination;
}

export interface IGetAllRoomsTypesResData {
  _id: string;
  name: string;
  description: string;
  allInclusivePrice?: number;
  breakfastPrice?: number;
  dinnerPrice?: number;
  amenities: string[];
  bedType: string;
  roomSize: string;
  images?: Image[];
  videos?: Video[];
  discountPercent: number;
  basePrice: number;
  unitCount: number;
  totalRooms: number;
  slug: string;
  maxGuests: number;
  isFeatured: boolean;
  addedBy: AddedBy;
  tags: string[];
  rating: Rating;
  likes: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  hotelId?: HotelId;
}

export interface Image {
  _id: string;
  url: string;
  publicId: string;
  assetId: string;
  type: string;
  resourceType: string;
  ownerId?: string;
  ownerModel: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Video {
  _id: string;
  url: string;
  publicId: string;
  assetId: string;
  type: string;
  resourceType: string;
  ownerId?: string;
  ownerModel: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddedBy {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface Rating {
  average: number;
  totalReviews: number;
}

export interface HotelId {
  _id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  images: Image[];
  rating: Rating;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  page: number;
  limit: number;
  totalDbRecord: number;
  totalPages: number;
}

export interface IGetRoomTypesResponse {
  message: string;
  data: IGetAllRoomsTypesResData[];
  pagination: Pagination;
}

export interface IGetRoomTypeByIdResponse {
  message: string;
  data: IGetAllRoomsTypesResData;
}

// !! =================== BOOKINGS TYPES ==========================

export interface BookingByIdResponse {
  message: string;
  booking: BookingByIdResponseBookings;
}

export interface BookingByIdResponseBookings {
  _id: string;
  breakfast: boolean;
  dinner: boolean;
  allInclusive: boolean;

  userId: IUseGetUserResUser;

  roomTypeId: {
    _id: string;
    name: string;
    description: string;
    amenities: string[];
    bedType: string;
    roomSize: string;
    images: Image[];
    videos: Video[];
    basePrice: number;
    unitCount: number;
    totalRooms: number;
    slug: string;
    maxGuests: number;
    isFeatured: boolean;
    addedBy: string;
    tags: string[];
    allInclusivePrice?: number;
    breakfastPrice?: number;
    dinnerPrice?: number;
    hotelId: string;

    rating: {
      average: number;
      totalReviews: number;
    };

    likes: number;
    status: string;
    discountPercent: number;

    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  roomId: {
    _id: string;
    roomNumber: string;
    roomCode: string;
    roomTypeId: string;
    hotelId: string;
    floor: string;
    isAvailable: boolean;
    status: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  hotelId: Hotel;

  guests: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  }[];

  basePrice: number;

  checkInDate: string;
  checkOutDate: string;

  numberOfGuests: number;
  bookingType: "manual" | "automatic";
  status: bookingStatusEnum;

  notes?: string;

  totalNights: number;
  pricePerNight: number;
  amount: number;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

export interface GetBookingsResponse {
  bookings: GetBookingsResponseBooking[]; // array, not single object
  pagination: Pagination;
  message: string;
}

export interface GetBookingsResponseBooking {
  _id: string;
  amount: number;
  bookingType: "automatic" | "manual";
  status: bookingStatusEnum;

  checkInDate: string | Date;
  checkOutDate: string | Date;
  totalNights: number;

  numberOfGuests: number;
  guests: Guest[];

  notes?: string;

  pricePerNight: number;
  basePrice: number;

  hotelId: Hotel;
  roomId: Room;
  roomTypeId: RoomType;

  userId: GetBookingsResponseUser;

  addedBy: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetBookingsResponseUser {
  _id: string;
  userId: string;
  email: string;
  fullName: string;
  avatarUploadId: string | null;
  avatar?: string | null;
}

export interface Hotel {
  _id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  roomCode: string;
  roomTypeId: string;
  hotelId: string;
}
export interface RoomType {
  _id: string;
  name: string;
  slug: string;
  description: string;

  basePrice: number;
  pricePerNight: number;
  discountPercent: number;

  bedType: string;
  roomSize: string;
  maxGuests: number;

  amenities: string[];
  tags: string[];
  images: string[];
  videos: string[];

  rating: {
    average: number;
    totalReviews: number;
  };

  totalRooms: number;
  unitCount: number;
  likes: number;
  isFeatured: boolean;
  status: "active" | "inactive";

  hotelId: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Guest {
  fullName?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;
}

export interface UploadFileResponse {
  message: string;
  data: {
    _id: string;
    url: string;
    publicId: string;
    assetId: string;
    type: string;
    resourceType: string;

    ownerId: {
      _id: string;
      email: string;
      fullName: string;
      role: string;
    };

    ownerModel: string;

    uploadedAt: string;
    createdAt: string;
    updatedAt: string;

    __v: number;
  };
}

// !! ======================= REVIEWS TYPES ==========================

export interface GetAllReviewsResponse {
  pagination: Pagination;
  message: string;
  reviews: Review[];
}

export interface Review {
  _id: string;
  userId: GetBookingsResponseUser;
  roomTypeId: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// !! ======================= PAYMENT TYPES ==========================
export interface InitializePaymentResponse {
  success: boolean;
  data: {
    paymentId: string;
    transactionId: string;
    link: string;
  };
}

export interface GetMyPaymentsResponse {
  success: boolean;
  data: GetMyPaymentsResponseData[];
  pagination: Pagination;
}

export interface GetMyPaymentsResponseData {
  _id: string;
  hotelId: HotelId;
  userId: string;
  paymentFor: string;
  roomBookingId: GetBookingsResponseBooking;
  amount: number;
  currency: string;
  method: string;
  status: PaymentStatusEnums;
  reference: string;
  metadata: {
    notes: string;
  };
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type PaymentStatusEnums = "pending" | "successful" | "failed" | "cancelled" | "refunded";
