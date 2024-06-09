export interface UserCredentials {
  email: string;
  password: string;
}

export type Permission = "READ" | "ADD" | "EDIT";

export interface ResourceAccess {
  [key: string]: Permission[] | null;
}

export interface IRegisterResponse {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  resource_access: {
    package_travel: {
      umra: Permission[] | null;
      hajj: Permission[] | null;
    };
    service: {
      visa: Permission[] | null;
      flight_ticket: Permission[] | null;
      hotel: Permission[] | null;
    };
  };
}
