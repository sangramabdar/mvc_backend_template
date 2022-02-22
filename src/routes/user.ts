import { Router } from "express";
import {
  validateAccess,
  validateId,
  validateToken,
} from "../common/helper/validation";
import dependencies from "../config/dependencies";
import { validateUserSchema } from "../entity/UserEntity";
const UserRouter = Router();

const { userController } = dependencies;

UserRouter.use("/:id", validateId, validateToken, validateAccess);
UserRouter.get("/:id", userController.getEntity);
UserRouter.put("/:id", validateUserSchema, userController.updateEntity);
UserRouter.delete("/:id", userController.deleteEntity);

export default UserRouter;
