// require("dotenv").config();
// import { initServer, app } from "./config/initServer";

import {
  SchemaObject,
  StringSchema,
  validateSchema,
} from "./common/schemaValidation/schema";
import BaseEntity from "./entity/BaseEntity";

// const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5050;

// initServer().then(_ => {
//   app.listen(PORT, () => {
//     console.log("server is started ");
//   });
// });

interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const UserSchema = SchemaObject<UserEntity>({
  firstName: new StringSchema().min(5).max(20).onlyAlphabets(),
  lastName: new StringSchema().min(5).max(20).onlyAlphabets(),
  email: new StringSchema().email(),
  password: new StringSchema().min(8).max(20),
});

console.log(validateSchema(UserSchema, { firstName: "123333" }, "partial"));
