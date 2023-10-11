"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async getAll() {
        return await User_model_1.User.find();
    }
    async getOneByParams(params) {
        return await User_model_1.User.findOne(params);
    }
    async findById(id) {
        return await User_model_1.User.findById(id);
    }
    async createUser(dto) {
        return await User_model_1.User.create(dto);
    }
    async register(dto) {
        return await User_model_1.User.create(dto);
    }
    async updateUser(userId, dto) {
        return await User_model_1.User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
    async updateOneById(userId, dto) {
        return await User_model_1.User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
    async setStatus(userId, status) {
        await User_model_1.User.updateOne({ _id: userId }, { $set: { status } });
    }
    async deleteUser(userId) {
        await User_model_1.User.deleteOne({ _id: userId });
    }
}
exports.userRepository = new UserRepository();
