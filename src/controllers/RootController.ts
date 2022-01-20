import { Request, Response } from "express";
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
}

export default RootController;