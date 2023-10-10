"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const mongodb_1 = require("mongodb");
const actionTokenType_enum_1 = require("../enums/actionTokenType.enum");
const email_action_enum_1 = require("../enums/email.action.enum");
const user_status_enum_1 = require("../enums/user-status.enum");
const api_error_1 = require("../errors/api.error");
const action_token_repository_1 = require("../repositories/action-token.repository");
const token_repository_1 = require("../repositories/token.repository");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("./email.service");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(dto) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(dto.password);
            const user = await user_repository_1.userRepository.register({
                ...dto,
                password: hashedPassword,
            });
            const actionToken = token_service_1.tokenService.generateActionToken({
                userId: user._id,
                name: user.name,
            }, actionTokenType_enum_1.EActionTokenType.activate);
            await action_token_repository_1.actionTokenRepository.create({
                token: actionToken,
                type: actionTokenType_enum_1.EActionTokenType.activate,
                _userId: user._id,
            });
            await email_service_1.emailService.sendMail(dto.email, email_action_enum_1.EEmailAction.REGISTER, {
                name: dto.name,
                actionToken,
            });
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async login(dto) {
        try {
            const user = await user_repository_1.userRepository.getOneByParams({ email: dto.email });
            if (!user) {
                throw new api_error_1.ApiError("Invalid credentials provided", 401);
            }
            const isMatched = await password_service_1.passwordService.compare(dto.password, user.password);
            if (!isMatched) {
                throw new api_error_1.ApiError("Invalid credentials provided", 401);
            }
            const tokensPair = token_service_1.tokenService.generateTokenPair({
                userId: user._id,
                name: user.name,
            });
            await token_repository_1.tokenRepository.create({ ...tokensPair, _userId: user._id });
            return tokensPair;
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async refresh(payload, refreshToken) {
        try {
            const tokensPair = token_service_1.tokenService.generateTokenPair({
                userId: payload.userId,
                name: payload.name,
            });
            await Promise.all([
                token_repository_1.tokenRepository.create({
                    ...tokensPair,
                    _userId: new mongodb_1.ObjectId(payload.userId),
                }),
                token_repository_1.tokenRepository.deleteOne({ refreshToken }),
            ]);
            return tokensPair;
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async logout(accessToken) {
        try {
            await token_repository_1.tokenRepository.deleteOne({ accessToken });
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async logoutAll(userId) {
        try {
            await token_repository_1.tokenRepository.deleteManyByUserId(userId);
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async activate(token) {
        try {
            const payload = token_service_1.tokenService.checkActionToken(token, actionTokenType_enum_1.EActionTokenType.activate);
            const entity = await action_token_repository_1.actionTokenRepository.findOne({ token });
            if (!entity) {
                throw new api_error_1.ApiError("Not valid token", 400);
            }
            await Promise.all([
                action_token_repository_1.actionTokenRepository.deleteManyByUserIdAndType(payload.userId, actionTokenType_enum_1.EActionTokenType.activate),
                user_repository_1.userRepository.setStatus(payload.userId, user_status_enum_1.EUserStatus.active),
            ]);
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async sendActivationToken(tokenPayload) {
        try {
            const user = await user_repository_1.userRepository.findById(tokenPayload.userId);
            if (user.status !== user_status_enum_1.EUserStatus.inactive) {
                throw new api_error_1.ApiError("User can not be activated", 403);
            }
            const actionToken = token_service_1.tokenService.generateActionToken({
                userId: user._id,
                name: user.name,
            }, actionTokenType_enum_1.EActionTokenType.activate);
            await action_token_repository_1.actionTokenRepository.create({
                token: actionToken,
                type: actionTokenType_enum_1.EActionTokenType.activate,
                _userId: user._id,
            });
            await email_service_1.emailService.sendMail(user.email, email_action_enum_1.EEmailAction.REGISTER, {
                name: user.name,
                actionToken,
            });
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
