"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicpriv_1 = require("./basicpriv");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Route Methods
app.get('/api/test/create', basicpriv_1.createTest);
app.post('/api/test/all', basicpriv_1.getAllTests);
app.put('/api/test/update', basicpriv_1.updateTest);
app.delete('/api/test/delete', basicpriv_1.deleteTest);
//check farts from the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
