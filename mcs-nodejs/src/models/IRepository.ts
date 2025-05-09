import { User, CreateUserDTO, UpdateUserDTO } from "./User.js";

export interface IRepository{
    create: (UserData: CreateUserDTO) => Promise<User | Error>;
    getOne: (id: string) => Promise<User | null>;
    getAll: () => Promise<User[]>;
    update: (id: string, updateData: UpdateUserDTO)  => Promise<User | null>;
    delete: (id: string) => Promise<boolean>;
}