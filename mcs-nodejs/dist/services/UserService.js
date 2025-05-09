"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async createUser(UserData) {
        const hashedPassword = await bcryptjs_1.default.hash(UserData.password, 10);
        UserData.password = hashedPassword;
        const result = this.repository.create(UserData);
        return result;
    }
    async getAllUsers() {
        const result = this.repository.getAll();
        return result;
    }
    async getUserById(id) {
        const result = this.repository.getOne(id);
        return result;
    }
    async getUserForLogin(email, password) {
        const Users = this.repository.getAll();
        const User = (await Users).find(a => a.email === email);
        if (User) {
            const pin = await bcryptjs_1.default.compare(password, User.password);
            if (pin) {
                const hours = 3;
                let dateExpire = new Date();
                dateExpire.setHours(dateExpire.getHours() + hours);
                const reqToken = {
                    userId: User.id.toString(),
                    role: User.role,
                    username: email
                };
                const options = {
                    expiresIn: '3h',
                };
                // Generar un secreto fuerte para mejor seguridad
                const generateStrongSecret = () => {
                    return (0, crypto_1.randomBytes)(32).toString('hex'); // Genera 64 caracteres hexadecimales
                };
                const secretKey = process.env.JWT_SECRET || generateStrongSecret();
                const token = jsonwebtoken_1.default.sign(reqToken, secretKey, options);
                const result = {
                    id: User.id,
                    name: User.name,
                    user: email,
                    role: User.role,
                    expire_date: dateExpire,
                    token: token
                };
                return result;
            }
        }
        return undefined;
    }
    async updateUser(id, updateData) {
        const result = this.repository.update(id, updateData);
        return result;
    }
    async deleteUser(id) {
        const result = this.repository.delete(id);
        return result;
    }
}
exports.UserService = UserService;
