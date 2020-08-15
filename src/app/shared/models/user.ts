/**
 * User model.
 */
export class User {
  _id?: string;
  handle?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  country?: string;
  phone?: string;
  token?: string;
  isAdmin?: boolean;
  verified?: boolean;
}
