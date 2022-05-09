import BaseEntity from "./BaseEntity";

interface TaskEntity extends BaseEntity {
  name: string;
  description: string;
}

export { TaskEntity };
