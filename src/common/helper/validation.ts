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

    if (!token)
      return next(new Error("authorization header is not provided in header"));

    const tokenPart = token.split(" ")[1];

    if (!tokenPart)
      return next(new Error("authorization header is not in correct format"));

    await verifyAccessToken(tokenPart);
  } catch (error) {
    next(error);
  }
}

async function generateAccessToken(payload: any, expiresIn: string = "") {
  let accessToken;
  if (expiresIn == "") {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY!!);
  } else {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY!!, {
      expiresIn,
    });
  }

  return accessToken;
}

async function generateRefreshToken(payload: any, expiresIn: string = "") {
  let refreshToken;
  if (expiresIn == "") {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY!!);
  } else {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY!!, {
      expiresIn,
    });
  }

  return refreshToken;
}

async function verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.ACCESS_KEY!!);
  delete data.iat;
  delete data.exp;
  return data;
}

async function verfiyRefreshToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.REFRESH_KEY!!);
  delete data.iat;
  delete data.exp;
  return data;
}



export {
  validateId,
  validateBody,
  validateToken,
  generateAccessToken,
  generateRefreshToken,
  verfiyRefreshToken,
  verifyAccessToken
};
