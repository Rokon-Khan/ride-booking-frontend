type UserProfile = {
  email: string;
  profile: {
    name?: string;
    phone?: string;
    address?: string;
  };
};

type DriverType = {
  user: UserProfile;
  vehicle?: {
    model: string;
    licensePlate: string;
  };
};

export type RideType = {
  _id: string;
  pickup: { address: string; lat: number; lng: number };
  destination: { address: string; lat: number; lng: number };
  status: string;
  fare: number;
  timestamps?: Record<string, string>;
  rider: string | UserProfile;
  driver: string | DriverType;
};
