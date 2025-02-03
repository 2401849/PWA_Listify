export interface Users {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
export interface CreateUser extends Partial<Users>  {
  name:string
  email: string;
  username: string;
  password: string;
}
export interface UpdateUser extends Partial<Users>  {
  name: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
