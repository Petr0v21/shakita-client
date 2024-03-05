export type ItemType = {
  dayName?: string;
  dayInNumber?: string;
  day?: string;
  time?: string;
};

export type PlaceBookedType = {
  place: string;
  date: string | Date;
};

export type PlaceActiveType = {
  place: string;
  date: string | Date;
  name: string;
  phone?: string;
  telegram?: string;
  instagram?: string;
  email: string;
  description?: string;
  enable_notification: boolean;
};

export type PlaceType = {
  placeId: string;
  name: string;
  status_book: boolean;
};

export type StyledBookType = {
  places: PlaceType[];
  placesActive: PlaceBookedType[];
  choosedPlaces: string;
  width?: string;
  height?: string;
};

export type ApplicationType = {
  id: string;
  email: string;
  place: string;
  description?: string;
  phone: string;
  name: string;
  telegram?: string;
  instagram?: string;
  enable_notification: boolean;
  status?: string;
  date?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type SessionType = {
  id: string;
  refreshToken: string;
  ip: string;
  userAgent: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type BonusTicketType = {
  id: string;
  count: number;
  asset: string;
  isActive: boolean;
  payload?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type AccountType = {
  id: string;
  email?: string;
  verified_email?: boolean;
  isGoogleAuth?: boolean;
  picture?: string;
  name?: string;
  google_id?: string;
  password?: string;
  phone?: string;
  enable_notifications?: boolean;
  isFullAuth?: boolean;
  role?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  applications?: ApplicationType[];
  sessions?: SessionType;
  bonusTickets?: BonusTicketType;
  telegram?: string;
  instagram?: string;
};

export type AuthFormType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  code: string;
};

export const NEXT = 'NEXT';
export const PREV = 'PREV';

export type Direction = typeof PREV | typeof NEXT;

export enum ApplicationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type DrawType = {
  name: string;
  id: string;
  dataHTML: string;
};
