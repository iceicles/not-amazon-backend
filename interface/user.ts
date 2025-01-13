export interface IUserSchema {
  _id: string;
  name: string;
  email: Record<string, boolean>;
  password: string;
  isAuthenticated: boolean
  comparePassword(arg: string): string;
  createdAt: Date
}
