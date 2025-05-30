"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const caseRoutes_1 = __importDefault(require("./routes/caseRoutes"));
const consultRoutes_1 = __importDefault(require("./routes/consultRoutes"));
const devRoutes_1 = __importDefault(require("./routes/devRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.use('/clients', clientRoutes_1.default);
app.use('/cases', caseRoutes_1.default);
app.use('/consults', consultRoutes_1.default);
app.use('/myadmin', devRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is working 🚀');
});
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
