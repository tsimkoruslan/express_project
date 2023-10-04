"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res, next) {
        try {
            await auth_service_1.authService.register(req.body);
            return res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const tokensPair = await auth_service_1.authService.login(req.body);
            return res.json(tokensPair);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const refreshToken = req.res.locals.refreshToken;
            const tokensPair = await auth_service_1.authService.refresh(tokenPayload, refreshToken);
            return res.status(201).json(tokensPair);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
