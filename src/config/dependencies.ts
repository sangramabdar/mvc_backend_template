import {
  UserController,
  UserControllerImpl,
} from "../controllers/UserController";

type DependencyType = {
  userController: UserController;
};

let dependencies: DependencyType = {
  userController: new UserControllerImpl(),
};

async function initDependencies() {}

export { dependencies, initDependencies };
