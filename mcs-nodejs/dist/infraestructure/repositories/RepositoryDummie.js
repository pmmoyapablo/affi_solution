"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryDummie = void 0;
class RepositoryDummie {
    constructor() {
        console.log('DataSource from Dummie');
    }
    async create(UserData) {
        const User = {
            id: '123211354566',
            email: UserData.email,
            name: UserData.name,
            password: UserData.password,
            role: UserData.role
        };
        return User;
    }
    async getOne(id) {
        const User = {
            id: '123456789',
            email: 'ws@ddd.com',
            name: 'Vita Paleta',
            password: '123452',
            role: 'super-User'
        };
        return id == User.id ? User : null;
    }
    async getAll() {
        const User1 = {
            id: '123211354562',
            email: 'carlos.rodriguez@elevaix.com',
            name: 'Vita Paleta',
            password: 'hash_simulado_3',
            role: 'super-User'
        };
        const User2 = {
            id: '123211354566',
            email: 'luis.torres@elevaix.com',
            name: 'Maria Paleta',
            password: 'hash_simulado_5',
            role: 'User'
        };
        const Users = [User1, User2];
        return Users;
    }
    async update(id, updateData) {
        const User = {
            id: '123211354562',
            email: 'ws@ddd.com',
            name: 'Vita Paleta',
            password: '123452',
            role: 'User'
        };
        return User;
    }
    async delete(id) {
        return true;
    }
}
exports.RepositoryDummie = RepositoryDummie;
