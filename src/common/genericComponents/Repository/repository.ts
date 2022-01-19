import { Db, ObjectId } from "mongodb";

interface Repository<T> {
  getAll(db: Db): Promise<T[] | null>;
  add(element: T, db: Db);
  updateById(id: string, element: T, db: Db): Promise<boolean>;
  deleteById(id: string, db: Db): Promise<boolean>;
  getById(id: string, db: Db): Promise<T | null>;
}

class RepositoryImpl<T> implements Repository<T> {
  protected _collection: string;

  constructor(collection: string) {
    this._collection = collection;
  }
  async getById(id: string, db: Db): Promise<T | null> {
    const _id = new ObjectId(id);

    const getResult = await db.collection(this._collection).findOne({ _id });
    if (!getResult) {
      return null;
    }
    return getResult as T;
  }

  async add(element: T, db: Db) {
    const insertOneResult = await db
      .collection(this._collection)
      .insertOne(element);
  }

  async updateById(id: string, element: T, db: Db): Promise<boolean> {
    const _id = new ObjectId(id);

    const updateResult = await db.collection(this._collection).updateOne(
      {
        _id,
      },
      {
        $set: element,
      }
    );

    if (updateResult.matchedCount == 0) {
      return false;
    }
    return true;
  }

  async deleteById(id: string, db: Db): Promise<boolean> {
    const deleteResult = await db
      .collection(this._collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount == 0) {
      return false;
    }

    return true;
  }

  async getAll(db: Db): Promise<T[] | null> {
    const users = await db.collection(this._collection).find().toArray();
    if (users.length === 0) {
      return null;
    }
    return users as T[];
  }
}

export { Repository, RepositoryImpl };
