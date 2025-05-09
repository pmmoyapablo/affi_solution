import { CreateUserDTO, User, UpdateUserDTO } from "../../models/User.js";
import { IRepository } from "../../models/IRepository.js";

export class RepositoryDummie implements IRepository{

    constructor(){ 
      console.log('DataSource from Dummie');      
    }

    async create(UserData: CreateUserDTO):  Promise<User | Error> {
        const User: User = {
            id: '123211354566',
            email: UserData.email,
            name: UserData.name,
            password: UserData.password,
            role: UserData.role
       };

       return User;
    }

    async getOne(id: string): Promise<User | null> {

        const User: User = {
            id: '123456789',
            email: 'ws@ddd.com',
            name: 'Vita Paleta',
            password: '123452',
            role: 'super-User'
        };

        return id == User.id? User : null;
    }

    async getAll(): Promise<User[]> {
        const User1: User = {
            id: '123211354562',
            email: 'carlos.rodriguez@elevaix.com',
            name: 'Vita Paleta',
            password: 'hash_simulado_3',
            role: 'super-User'
       };

       const User2: User = {
        id: '123211354566',
        email: 'luis.torres@elevaix.com',
        name: 'Maria Paleta',
        password: 'hash_simulado_5',
        role: 'User'
        };

        const Users: User[] = [User1, User2];

       return Users;
    }

    async update(id: string, updateData: UpdateUserDTO):  Promise<User | null> {

        const User: User = {
            id: '123211354562',
            email: 'ws@ddd.com',
            name: 'Vita Paleta',
            password: '123452',
            role: 'User'
       };

        return User;
    }

    async delete(id: string): Promise<boolean> {
        return true;
    }

}