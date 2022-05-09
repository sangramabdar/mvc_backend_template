import { hash, compare } from "bcryptjs";
import {
  DataBaseConnectionError,
  EmailExists,
  NotRegistered,
} from "../common/helper/exceptions";
import Database from "../config/db";

import { UserEntity } from "../entity/UserEntity";
import { LoginSchema, SignUpSchema } from "../schema/authSchema";

async function signUpService(signUpSchema: SignUpSchema) {
  const db = await Database.getDb();
  const { email, password } = signUpSchema;

  if (!db) {
    throw new DataBaseConnectionError();
  }

  let user = await db.collection("users").findOne({
    email,
  });

  if (user) {
    throw new EmailExists();
  }

  const hashPassword = await hash(password, 10);

  let result = await db.collection("users").insertOne({
    ...signUpSchema,
    password: hashPassword,
  });

  return signUpSchema;
}

async function loginService(loginSchema: LoginSchema) {
  const db = await Database.getDb();
  const { email, password } = loginSchema;

  if (!db) {
    throw new DataBaseConnectionError();
  }

  const user = (await db.collection("users").findOne(
    {
      email,
    },
    {
      projection: {
        email: 1,
        password: 1,
      },
    }
  )) as UserEntity;

  if (!user) {
    throw new NotRegistered();
  }

  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    throw new Error("password is not matched");
  }

  return {
    _id: user._id,
    email: user.email,
  };
}

export { signUpService, loginService };
