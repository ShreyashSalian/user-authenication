export interface LoginBody {
  userNameOrEmail: string;
  password: string;
}

export interface UserBody {
  userName: string;
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  password: string;
}
