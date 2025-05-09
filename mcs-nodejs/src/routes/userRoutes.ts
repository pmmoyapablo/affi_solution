import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { validateUser, validateLogin } from '../middleware/validateUser.js';
import jwt from 'jsonwebtoken';
import { IRepository } from "../models/IRepository.js";
import { Injector } from '../infraestructure/injections/Injector.js'
import { UserService } from '../services/UserService.js';

const router = Router();
const injector = Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
const repository = injector.resolve<IRepository>('repository');
const userService = new UserService(repository);
const userController = new UserController(userService);

router.post('/login', validateLogin, (req: any, res: any) => userController.loginAuth(req, res));
router.post('/', validateUser, verifyToken, (req: any, res: any) => userController.create(req, res));
router.get('/', verifyToken, (req, res) => userController.getAll(req, res));
router.get('/:id', verifyToken, (req, res) => userController.getById(req, res));
router.put('/:id', validateUser, verifyToken, (req: any, res: any) => userController.update(req, res));
router.delete('/:id', verifyToken, (req, res) => userController.delete(req, res));

function verifyToken(req: any, res: any, next: any) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const secretKey = process.env.JWT_SECRET || "tu_secret_123";
    const payload = jwt.verify(token, secretKey);
    req.username = payload;
    next();
  } catch (error) {
    console.log("Error:" + error);
    return res.status(403).json({ message: "Token not valid" });
  }
}

export default router;