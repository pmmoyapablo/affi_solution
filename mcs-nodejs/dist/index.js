"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
// Load environment variables before any other imports
dotenv_1.default.config();
// Validate required environment variables
const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME'
];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error('Error: Required environment variables are not set:', missingEnvVars);
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: 'http://localhost:3000', // Permite solo este origen
    credentials: true, // Permite cookies/credenciales
    optionsSuccessStatus: 200 // Algunos navegadores legacy (IE11, varios SmartTVs) se ahogan con 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Routes
app.use('/api/users', userRoutes_js_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
