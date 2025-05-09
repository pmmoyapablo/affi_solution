"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryMySql = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables before any other imports
dotenv_1.default.config();
class RepositoryMySql {
    constructor() {
        console.log('DataSource from MySQL');
        // Validar variables de entorno
        if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER ||
            !process.env.DB_PASSWORD || !process.env.DB_NAME) {
            throw new Error('Database configuration is incomplete. Please check your environment variables.');
        }
        const dbConfig = {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };
        this.pool = promise_1.default.createPool(dbConfig);
        // Verificar la conexión
        this.pool.getConnection()
            .then(connection => {
            console.log('Successfully connected to MySQL database');
            connection.release();
        })
            .catch(error => {
            console.error('Error connecting to MySQL database:', error);
            throw error;
        });
    }
    async create(UserData) {
        try {
            const User = {
                id: (0, uuid_1.v4)(),
                email: UserData.email,
                name: UserData.name,
                password: UserData.password,
                role: UserData.role
            };
            const [result] = await this.pool.execute('INSERT INTO Users (id, email, name, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)', [User.id, User.email, User.name, User.password, User.role, new Date(), new Date()]);
            const insertedId = result.insertId;
            return User;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        ;
    }
    async getOne(id) {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM Users WHERE id = ?', [id]);
            return rows[0] || undefined;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        ;
    }
    async getAll() {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM Users');
            return rows;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        ;
    }
    async update(id, updateData) {
        try {
            const User = {
                id: id,
                email: updateData.email,
                name: updateData.name,
                password: updateData.password,
                role: updateData.role
            };
            const [result] = await this.pool.execute('UPDATE Users SET name = ?, email = ?, password = ?, role = ?, updatedAt = ? WHERE id = ?', [User.name, User.email, User.password, User.role, new Date(), User.id]);
            if (result.affectedRows === 0) {
                throw new Error("Error trying update");
            }
            return User;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        ;
    }
    async delete(id) {
        try {
            const [result] = await this.pool.execute('DELETE FROM Users WHERE id = ?', [id]);
            return true;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        ;
    }
}
exports.RepositoryMySql = RepositoryMySql;
