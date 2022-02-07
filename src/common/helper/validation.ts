import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { WrongContent } from "./exceptions";

async function validateId(req: Request, res: Response, next) {
  try {
    var id = req.params["id"];
    var isValid = ObjectId.isValid(id);
    if (!isValid) {
      throw new WrongContent("id is in wrong format");
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateBody(req: Request, res: Response, next) {
  try {
    if (Object.keys(req.body).length == 0)
      throw new Error("body should not be empty");
    next();
  } catch (error) {
    next(error);
  }
}

async function validateToken(req: Request, res: Response, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) throw new Error("token is not provided in header");
    const tokenPart = token.split(" ")[1];
    if (!tokenPart) {
      throw new Error("token is not in correct format");
    }
    const data = await jwt.verify(tokenPart, process.env.ACCESS_KEY!!);
    return res.json({ token: "token is valid" });
  } catch (error) {
    next(error);
  }
}

async function generateAccessToken(req: Request, res: Response, next) {
  try {
    const { token } = req.body;
    const data = await jwt.verify(token, process.env.REFRESH_KEY!!);

    //deleting unnecessary fields
    delete data.iat;
    delete data.exp;

    const accessToken = await jwt.sign(data, process.env.ACCESS_KEY!!, {
      expiresIn: "30s",
    });
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export { validateId, validateBody, validateToken, generateAccessToken };
