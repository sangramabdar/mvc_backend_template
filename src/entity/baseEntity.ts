import { ObjectId } from "mongodb";

interface BaseEntity {
  _id?: ObjectId;
}

export default BaseEntity;
