import bcrypt from 'bcryptjs';
import { User, CreateUserDTO, MyTokenPayload , ResultLogin, UpdateUserDTO } from '../models/User.js';
import { IRepository } from '../models/IRepository.js';
import jwt, { SignOptions } from 'jsonwebtoken';
import { randomBytes } from 'crypto'; 

export class UserService {

  constructor(private repository: IRepository) { 
  }

  async createUser(UserData: CreateUserDTO): Promise<User | Error> {
    const hashedPassword = await bcrypt.hash(UserData.password, 10);
    UserData.password = hashedPassword;
    const result = this.repository.create(UserData);
      
    return result;
  }

  async getAllUsers(): Promise<User[]> {
    const result = this.repository.getAll();
    return result;
  }

  async getUserById(id: string): Promise<User | null> {
    const result = this.repository.getOne(id);
    return result;
  }

  async getUserForLogin(email: string, password: string): Promise<ResultLogin | undefined> {
    const Users = this.repository.getAll();
    const User = (await Users).find(a => a.email === email);

    if(User)
    {    
      const pin = await bcrypt.compare(password, User.password);

      if(pin)
      {
        const hours = 3;
        let dateExpire = new Date();
        dateExpire.setHours(dateExpire.getHours() + hours);

        const reqToken: MyTokenPayload = {
           userId: User.id.toString(),
           role: User.role,
           username: email
        };
        
        const options: SignOptions = { 
          expiresIn: '3h',       
        };

        // Generar un secreto fuerte para mejor seguridad
        const generateStrongSecret = (): string => {
          return randomBytes(32).toString('hex'); // Genera 64 caracteres hexadecimales
        };
        const secretKey: string = process.env.JWT_SECRET || generateStrongSecret();

        const token = jwt.sign(reqToken ,  secretKey , options);
        
        const result: ResultLogin = {
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

  async updateUser(id: string, updateData: UpdateUserDTO): Promise<User | null> {
    const result = this.repository.update(id, updateData);
    return result;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = this.repository.delete(id);
    return result;
  }
}