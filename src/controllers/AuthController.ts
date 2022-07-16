import { Response, Request } from "express";

import ResponseBodyBuilder from "../common/helper/responseBodyBuilder";
import { generateAccessToken } from "../common/helper/validation";
import { LoginSchema } from "../schema/authSchema";

import { loginService, signUpService } from "../services/AuthService";

class AuthController {
  static async login(req: Request, res: Response, next) {
    try {
      const loginEntity = req.body as LoginSchema;

      const user = await loginService(loginEntity);

      const accessToken = await generateAccessToken(user);

      const responseBody = new ResponseBodyBuilder()
        .setStatus(200)
        .setPayload({ accessToken, _id: user._id });

      return res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async signup(req: Request, res: Response, next) {
    try {
      const signUpEntity = req.body;

      const { email } = await signUpService(signUpEntity);

      const responseBody = new ResponseBodyBuilder<{ email: string }>()
        .setStatus(201)
        .setPayload({
          email,
        });

      return res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
