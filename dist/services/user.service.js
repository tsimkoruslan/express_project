"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getAll() {
        return await user_repository_1.userRepository.getAll();
    }
    async updateUser(userId, dto) {
        return await user_repository_1.userRepository.updateUser(userId, dto);
    }
    async deleteUser(userId) {
        await user_repository_1.userRepository.deleteUser(userId);
    }
}
exports.userService = new UserService();
