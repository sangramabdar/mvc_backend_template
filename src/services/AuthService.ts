import { hash, compare } from "bcryptjs";
import {
  DataBaseConnectionError,
  EmailExist,
  NotRegistered,
} from "../common/helper/exceptions";
import Database from "../config/db";
import { AuthEntity } from "../entity/AuthEntity";

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
    throw new Error("password is not matched");
  }

  return { email: user.email };
}

export { signUpService, loginService };
