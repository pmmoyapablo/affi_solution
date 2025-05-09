"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_js_1 = require("../controllers/UserController.js");
const validateUser_js_1 = require("../middleware/validateUser.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Injector_js_1 = require("../infraestructure/injections/Injector.js");
const UserService_js_1 = require("../services/UserService.js");
const router = (0, express_1.Router)();
const injector = Injector_js_1.Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
const repository = injector.resolve('repository');
const userService = new UserService_js_1.UserService(repository);
const userController = new UserController_js_1.UserController(userService);
router.post('/login', validateUser_js_1.validateLogin, (req, res) => userController.loginAuth(req, res));
router.post('/', validateUser_js_1.validateUser, verifyToken, (req, res) => userController.create(req, res));
router.get('/', verifyToken, (req, res) => userController.getAll(req, res));
router.get('/:id', verifyToken, (req, res) => userController.getById(req, res));
router.put('/:id', validateUser_js_1.validateUser, verifyToken, (req, res) => userController.update(req, res));
router.delete('/:id', verifyToken, (req, res) => userController.delete(req, res));
function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const secretKey = process.env.JWT_SECRET || "tu_secret_123";
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        req.username = payload;
        next();
    }
    catch (error) {
        console.log("Error:" + error);
        return res.status(403).json({ message: "Token not valid" });
    }
}
exports.default = router;
