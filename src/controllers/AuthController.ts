import { Response } from "express";
import { Request } from "express";

import ResponseBodyBuilder from "../common/helper/responseBodyBuilder";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../common/helper/validation";

import { loginService, signUpService } from "../services/AuthService";

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
      console.log("login");
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
