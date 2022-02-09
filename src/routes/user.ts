import { Router } from "express";
import { validateBody, validateId } from "../common/helper/validation";
import dependencies from "../config/dependencies";
import { validateUserSchema } from "../entity/UserEntity";
import {} from "../config/dependencies";
const UserRouter = Router();

const { userController } = dependencies;

UserRouter.get("/", userController.getAllEntities);
UserRouter.get("/:id", validateId, userController.getEntity);
UserRouter.post(
  "/",
  validateBody,
  validateUserSchema,
  userController.addEntity
);
UserRouter.put(
  "/:id",
  validateId,
  validateBody,
  validateUserSchema,
  userController.updateEntity
);
UserRouter.delete("/:id", validateId, userController.deleteEntity);

export default UserRouter;
