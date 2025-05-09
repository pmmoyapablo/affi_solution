import { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';
import { CreateUserDTO, UpdateUserDTO } from '../models/User.js';

export class UserController {
  
  constructor(private UserService: UserService) {
  }

  async create(req: Request, res: Response) {
    try {
      const UserData: CreateUserDTO = req.body;
      const User = await this.UserService.createUser(UserData);
      res.status(201).json(User);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const Users = await this.UserService.getAllUsers();
      res.json(Users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const User = await this.UserService.getUserById(req.params.id);
      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(User);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async loginAuth(req: Request, res: Response) {
    try {  
      const loginResult = await this.UserService.getUserForLogin(req.body.email, req.body.password);
      if (!loginResult) {
        return res.json({ error: 'Login not found' });
      }
      res.json(loginResult);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateData: UpdateUserDTO = req.body;
      const User = await this.UserService.updateUser(req.params.id, updateData);
      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(User);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const success = await this.UserService.deleteUser(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}