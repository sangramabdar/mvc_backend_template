import { Request, Response } from "express";

class RootController {
  static async get(req: Request, res: Response) {
    return res.send("app");
  }

  static async wrongRoute(req: Request, res: Response) {
    console.log("wrong route");
    return res.sendStatus(404);
  }
}

export default RootController;
