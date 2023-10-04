"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const user_repository_1 = require("../repositories/user.repository");
class UserMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_repository_1.userRepository.findById(userId);
            if (!user) {
                throw new api_error_1.ApiError("User not found", 404);
            }
            req.res.locals = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isEmailUniq(req, res, next) {
        try {
            const { email } = req.body;
            const user = await user_repository_1.userRepository.getOneByParams({ email });
            if (user) {
                throw new api_error_1.ApiError("Email already exist", 409);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
