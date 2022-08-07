export interface UserProperties {
  email: string;
  name: string;
  password: string;
}

export interface SanitizedUser extends UserProperties {
  isActive: boolean;
  id: number;
}
