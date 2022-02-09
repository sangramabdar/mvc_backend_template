import { Request, Response } from "express";

function Logger(req: Request, res: Response, next) {
  console.log(`${req.method} : ${req.url}`);
  next();
}

export default Logger;
