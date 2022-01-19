import {
  UserController,
  UserControllerImpl,
} from "../entity/user/user.controller";

type DependencyType = {
  userController: UserController;
};

let dependencies: DependencyType = {
  userController: new UserControllerImpl(),
};

async function initDependencies() {}

export { dependencies, initDependencies };
