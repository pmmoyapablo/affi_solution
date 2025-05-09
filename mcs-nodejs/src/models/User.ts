export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ResultLogin{
  id: string;
  user: string;
  role: string;
  name: string;
  expire_date: Date;
  token: string;
}

export interface MyTokenPayload {
  userId: string;
  role: string;
  username: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface UpdateUserDTO {
  name: string;
  role: string;
  email: string;
  password: string;
}