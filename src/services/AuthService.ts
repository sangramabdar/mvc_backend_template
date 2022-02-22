import { hash, compare } from "bcryptjs";
import {
  DataBaseConnectionError,
  EmailExists,
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

  let user = await db.collection("users").findOne({
    email,
  });

  if (user) {
    throw new EmailExists();
  }

  const hashPassword = await hash(password, 10);

  let result = await db.collection("users").insertOne({
    email,
    password: hashPassword,
  });

  return {
    _id: result.insertedId,
    email: authEntity.email,
  };
}

async function loginService(authEntity: AuthEntity) {
  const db = await Database.getDb();
  const { email, password } = authEntity;

  if (!db) {
    throw new DataBaseConnectionError();
  }

  const user = await db.collection("users").findOne(
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

  if (!user) {
    throw new NotRegistered();
  }

  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    throw new Error("password is not matched");
  }

  delete user.password;

  return user;
}

export { signUpService, loginService };
