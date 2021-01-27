"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var PORT = 3000;
var devEnv = process.env.NODE_ENV === 'development';
app.get('/ping', function (_req, res) {
    res.send('patientor pong');
});
app.listen(PORT, function () {
    var isDev = devEnv ? '\n=-=-=-  DEVELOPMENT ENVIRONMENT  -=-=-=' : '';
    console.log(isDev + "\nServer running at http://localhost:" + PORT);
});
