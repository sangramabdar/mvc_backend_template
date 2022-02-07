import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import RootService from "../services/RootService";

class RootController {
  private static appService: RootService = new RootService();

  static async get(req: Request, res: Response) {
    const result = await RootController.appService.getApp();
    return res.send("app");
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.sendStatus(404);
  }

  static async loginRoute(req: Request, res: Response, next) {
    try {
      // if (!RootController.c.isOpen) {
      //   await RootController.c.connect();
      // }

      const data: { email: string; password: string } = req.body;
      // const db = await Database.getDb();
      // const d = await db?.collection("users").findOne(
      //   {
      //     email: data.email,
      //     password: data.password,
      //   },
      //   {
      //     projection: {
      //       id: 0,
      //     },
      //   }
      // );

      // if (!d) {
      //   res.statusCode = 400;
      //   return res.json({ error: "not found" });
      // }

      const accessToken = await jwt.sign(data, process.env.ACCESS_KEY!!, {
        expiresIn: "30s",
      });
      let refreshToken = await jwt.sign(data, process.env.REFRESH_KEY!!, {
        expiresIn: "1d",
      });
      // const v = await RootController.c.get(data.email);
      // if (!v) {
      //   console.log("called");
      //   await RootController.c.set(data.email, refreshToken);
      // } else {
      //   refreshToken = v;
      // }
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }
}

export default RootController;
