import { NextFunction, Request, Response } from "express";

import { carService } from "../services/car.service";
import { ICar } from "../types/car.type";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async createCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const car = await carService.createCar(req.body);

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
  public async deleteCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await carService.deleteCar(req.params.carId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const car = await carService.updateCar(req.params.carId, req.body);

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = req.res.locals;

      res.json(car);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
