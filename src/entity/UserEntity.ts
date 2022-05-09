import BaseEntity from "./BaseEntity";

interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export { UserEntity };
