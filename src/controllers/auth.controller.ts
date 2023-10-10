import { NextFunction, Request, Response } from "express";

import { EEmailAction } from "../enums/email.action.enum";
import { userRepository } from "../repositories/user.repository";
import { authService } from "../services/auth.service";
import { emailService } from "../services/email.service";
import { tokenService } from "../services/token.service";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authService.register(req.body);
      await emailService.sendMail(req.body.email, EEmailAction.REGISTER);
      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const tokensPair = await authService.login(req.body);

      return res.json(tokensPair);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const tokensPair = await authService.refresh(tokenPayload, refreshToken);

      return res.status(201).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const accessToken = req.res.locals.accessToken as string;

      await authService.logout(accessToken);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      await authService.logoutAll(tokenPayload.userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async activate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const actionToken = req.query.actionToken as string;

      await authService.activate(actionToken);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async sendActivationToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;

      await authService.sendActivationToken(tokenPayload);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
