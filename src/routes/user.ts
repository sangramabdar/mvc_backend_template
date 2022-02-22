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

UserRouter.get(
  "/:id",
  validateId,
  validateToken,
  validateAccess,
  userController.getEntity
);
UserRouter.post(
  "/:id",
  validateId,
  validateToken,
  validateAccess,
  validateUserSchema,
  userController.addEntity
);
UserRouter.put(
  "/:id",
  validateId,
  validateToken,
  validateAccess,
  validateUserSchema,
  userController.updateEntity
);
UserRouter.delete(
  "/:id",
  validateId,
  validateToken,
  validateAccess,
  userController.deleteEntity
);

export default UserRouter;
