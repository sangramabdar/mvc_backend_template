import { Db, ObjectId } from "mongodb";

type FilterField<T> = {
  [K in keyof T]: 1 | 0;
};

interface Repository<T> {
  getById(
    id: string,
    db: Db,
    filterFields?: FilterField<Partial<T>> | {}
  ): Promise<T | null>;
  getAll(
    db: Db,
    filterFields?: FilterField<Partial<T>> | {}
  ): Promise<T[] | null>;
  save(element: T, db: Db): Promise<T>;
  updateById(id: string, element: T, db: Db): Promise<boolean>;
  deleteById(id: string, db: Db): Promise<boolean>;
  deleteAll(db: Db);
}

class RepositoryImpl<T> implements Repository<T> {
  protected _collection: string;

  constructor(collection: string) {
    this._collection = collection;
  }

  async getById(
    id: string,
    db: Db,
    filterFields: FilterField<Partial<T>> | {} = {}
  ): Promise<T | null> {
    const _id = new ObjectId(id);

    const getResult = await db.collection(this._collection).findOne(
      { _id },
      {
        projection: filterFields,
      }
    );
    if (!getResult) {
      return null;
    }
    return getResult as T;
  }

  async getAll(
    db: Db,
    filterFields: FilterField<Partial<T>> | {} = {}
  ): Promise<T[] | null> {
    const users = await db
      .collection(this._collection)
      .find(
        {},
        {
          projection: filterFields,
        }
      )
      .toArray();
    if (users.length === 0) {
      return null;
    }
    return users as T[];
  }

  async getSpecificFields(
    id: string,
    filterFields: FilterField<T>,
    db: Db
  ): Promise<T | null> {
    const _id = new ObjectId(id);
    const result = await db.collection(this._collection).findOne(
      { _id },
      {
        projection: {
          ...filterFields,
        },
      }
    );

    if (result == null) {
      return null;
    }
    return result as T;
  }

  async save(element: T, db: Db) {
    const insertOneResult = await db
      .collection(this._collection)
      .insertOne(element);
    return element;
  }

  async updateById(id: string, element: T, db: Db): Promise<boolean> {
    const _id = new ObjectId(id);
    const updateResult = await db.collection<T>(this._collection).updateOne(
      {},
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

  async deleteAll(db: Db) {
    await db.collection(this._collection).deleteMany({});
  }
}

export { Repository, RepositoryImpl };
