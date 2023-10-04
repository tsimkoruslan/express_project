"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await user_service_1.userService.getAll();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteUser(req, res, next) {
        try {
            await user_service_1.userService.deleteUser(req.params.userId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateUser(req, res, next) {
        try {
            const user = await user_service_1.userService.updateUser(req.params.userId, req.body);
            res.status(201).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const user = req.res.locals;
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
