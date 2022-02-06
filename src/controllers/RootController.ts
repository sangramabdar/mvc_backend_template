import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import configure from "../config";
import Database from "../config/db";
import RootService from "../services/RootService";

class RootController {
  private static appService: RootService = new RootService();

  private static secretKey: string = "123";
  static async get(req: Request, res: Response) {
    const result = await RootController.appService.getApp();
    return res.send("app");
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.sendStatus(404);
  }

  static async accessRoute(req: Request, res: Response, next) {
    try {
      const { token } = req.body;
      const data = await jwt.verify(token, configure.jwtSecretKey!!);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async loginRoute(req: Request, res: Response, next) {
    try {
      const data = req.body;
      const db = await Database.getDb();
      const d = await db?.collection("users").findOne(
        {
          email: data.email,
          password: data.password,
        },
        {
          projection: {
            id: 0,
          },
        }
      );

      if (!d) {
        res.statusCode = 400;
        return res.json({ error: "not found" });
      }

      const token = await jwt.sign(d, configure.jwtSecretKey!!);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default RootController;
