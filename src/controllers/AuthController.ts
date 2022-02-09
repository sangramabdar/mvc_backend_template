import { Response } from "express";
import { Request } from "express";
import {
  DataBaseConnectionError,
  EmailExist,
  NotRegistered,
} from "../common/helper/exceptions";
import ResponseBodyBuilder from "../common/helper/responseBodyBuilder";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../common/helper/validation";
import Database from "../config/db";
import { AuthEntity } from "../entity/AuthEntity";
import { hash, compare } from "bcryptjs";

async function signUpService(authEntity: AuthEntity) {
  const db = await Database.getDb();
  const { email, password } = authEntity;

  if (!db) {
    throw new DataBaseConnectionError();
  }

  const user = await db.collection("users").findOne({
    email,
  });

  if (user) {
    throw new EmailExist();
  }

  const hashPassword = await hash(password, 10);

  await db.collection("users").insertOne({
    email,
    password: hashPassword,
  });

  return "registered";
}

async function loginService(authEntity: AuthEntity) {
  const db = await Database.getDb();
  const { email, password } = authEntity;

  if (!db) {
    throw new DataBaseConnectionError();
  }

  const result = await db.collection("users").findOne(
    {
      email,
    },
    {
      projection: {
        email: 1,
        password: 1,
      },
    }
  );

  if (!result) {
    throw new NotRegistered();
  }

  const user = result as AuthEntity;

  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    throw new Error("password is not correct");
  }

  return { email: user.email };
}

class AuthController {
  static async login(req: Request, res: Response, next) {
    try {
      const authEntity = req.body;

      const doc = await loginService(authEntity);

      const accessToken = await generateAccessToken(doc);
      const refreshToken = await generateRefreshToken(doc);

      const responseBody = new ResponseBodyBuilder()
        .setStatus(200)
        .setPayload({ accessToken, refreshToken });

      return res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async signup(req: Request, res: Response, next) {
    try {
      const authEntity = req.body;

      const result = await signUpService(authEntity);

      const responseBody = new ResponseBodyBuilder<string>()
        .setStatus(201)
        .setPayload(result);

      return res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
