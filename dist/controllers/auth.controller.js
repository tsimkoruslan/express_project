"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const email_action_enum_1 = require("../enums/email.action.enum");
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
class AuthController {
    async register(req, res, next) {
        try {
            await auth_service_1.authService.register(req.body);
            await email_service_1.emailService.sendMail(req.body.email, email_action_enum_1.EEmailAction.REGISTER);
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
    async logout(req, res, next) {
        try {
            const accessToken = req.res.locals.accessToken;
            await auth_service_1.authService.logout(accessToken);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async logoutAll(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            await auth_service_1.authService.logoutAll(tokenPayload.userId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const actionToken = req.query.actionToken;
            await auth_service_1.authService.activate(actionToken);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async sendActivationToken(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            await auth_service_1.authService.sendActivationToken(tokenPayload);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
