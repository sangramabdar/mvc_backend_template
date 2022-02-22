import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

async function validateId(req: Request, res: Response, next) {
  let id = req.params["id"];
  let isValid = ObjectId.isValid(id);
  if (!isValid) {
    return next(new Error("id is in wrong format"));
  }
  next();
}

async function validateBody(req: Request, res: Response, next) {
  if (Object.keys(req.body).length == 0)
    return next(new Error("body should not be empty"));
  next();
}

async function validateToken(req: Request, res: Response, next) {
  try {
    const token = req.headers["authorization"];

    if (!token)
      return next(new Error("authorization header is not provided in header"));

    const tokenPart = token.split(" ")[1];

    if (!tokenPart)
      return next(new Error("authorization header is not in correct format"));

    const data = await verifyAccessToken(tokenPart);
    req.body.user = data;
    next();
  } catch (error) {
    next(new Error("token is invalid"));
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

async function validateAccess(req: Request, res: Response, next) {
  const id = req.params["id"];
  const user = req.body.user;
  if (id !== user._id) {
    return next(new Error("this token can not be used to access this route"));
  }
  delete req.body.user;
  next();
}

export {
  validateId,
  validateBody,
  validateToken,
  generateAccessToken,
  generateRefreshToken,
  verfiyRefreshToken,
  verifyAccessToken,
  validateAccess,
};
