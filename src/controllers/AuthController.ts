import { Response } from "express";
import { Request } from "express";

import ResponseBodyBuilder from "../common/helper/responseBodyBuilder";
import { generateAccessToken } from "../common/helper/validation";
import { AuthEntity } from "../entity/AuthEntity";

import { loginService, signUpService } from "../services/AuthService";

class AuthController {
  static async login(req: Request, res: Response, next) {
    try {
      const authEntity = req.body;

      const user = await loginService(authEntity);

      const accessToken = await generateAccessToken(user);

      const responseBody = new ResponseBodyBuilder()
        .setStatusCode(200)
        .setPayload({ accessToken, _id: user._id });

      return res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async signup(req: Request, res: Response, next) {
    try {
      const authEntity = req.body;

      const result = await signUpService(authEntity);

      const responseBody = new ResponseBodyBuilder()
        .setStatusCode(201)
        .setPayload(result);

      return res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
