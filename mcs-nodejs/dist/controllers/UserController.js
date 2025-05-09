"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async create(req, res) {
        try {
            const UserData = req.body;
            const User = await this.UserService.createUser(UserData);
            res.status(201).json(User);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const Users = await this.UserService.getAllUsers();
            res.json(Users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const User = await this.UserService.getUserById(req.params.id);
            if (!User) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(User);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async loginAuth(req, res) {
        try {
            const loginResult = await this.UserService.getUserForLogin(req.body.email, req.body.password);
            if (!loginResult) {
                return res.json({ error: 'Login not found' });
            }
            res.json(loginResult);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const updateData = req.body;
            const User = await this.UserService.updateUser(req.params.id, updateData);
            if (!User) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(User);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const success = await this.UserService.deleteUser(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
