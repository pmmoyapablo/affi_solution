import { CreateUserDTO, User, UpdateUserDTO } from "../../models/User.js";
import { IRepository } from "../../models/IRepository.js";
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Load environment variables before any other imports
dotenv.config();

export class RepositoryMySql implements IRepository{
    private pool: mysql.Pool;

    constructor(){
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
        
        this.pool = mysql.createPool(dbConfig);

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

    async create(UserData: CreateUserDTO):  Promise<User | Error> {
        try{  
            const User: User = {
                id: uuidv4(),
                email: UserData.email,
                name: UserData.name,
                password: UserData.password,
                role: UserData.role
           };
            const [result] = await this.pool.execute<mysql.ResultSetHeader>('INSERT INTO Users (id, email, name, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                [User.id, User.email, User.name, User.password, User.role, new Date(), new Date()]);
            const insertedId = result.insertId;
             return User;
          }catch (error) {
            console.log(error);
            throw error;
          };
    }

    async getOne(id: string): Promise<User | null> {
        try{ 
            const [rows] = await this.pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Users WHERE id = ?', [id]);  
            return (rows[0] as User) || undefined;
          }catch (error) {
            console.log(error);
            throw error;
          };
    }

    async getAll(): Promise<User[]> {
        try{
            const [rows] = await this.pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Users');
            return rows as User[];
           }catch (error) {
            console.log(error);
            throw error;
          };
    }

    async update(id: string, updateData: UpdateUserDTO):  Promise<User | null> {
        try{ 
            const User: User = {
                id: id,
                email: updateData.email,
                name: updateData.name,
                password: updateData.password,
                role: updateData.role
            }; 
            const [result] = await this.pool.execute<mysql.ResultSetHeader>('UPDATE Users SET name = ?, email = ?, password = ?, role = ?, updatedAt = ? WHERE id = ?', 
                [User.name, User.email, User.password, User.role, new Date(), User.id]);
            if (result.affectedRows === 0) {
                throw new Error("Error trying update");
             }
             return User;
          }catch (error) {
            console.log(error);
            throw error;
          };
    }

    async delete(id: string): Promise<boolean> {
        try{
            const [result] = await this.pool.execute<mysql.ResultSetHeader>('DELETE FROM Users WHERE id = ?', [id]);
            return true;
          }catch (error) {
            console.log(error);
            throw error;
          };
    }
}
