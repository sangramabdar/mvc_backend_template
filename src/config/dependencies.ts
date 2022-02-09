import { UserController } from "../controllers/UserController";

type DependencyType = {
  userController: UserController;
};

let dependencies: DependencyType = {
  userController: new UserController(),
};

export default dependencies;
