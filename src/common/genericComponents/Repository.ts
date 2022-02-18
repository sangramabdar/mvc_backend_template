import { Db, ObjectId } from "mongodb";

type FilterField<E> = {
  [K in keyof E]: 1 | 0;
};

interface CrudRepository<E> {
  getById(
    id: string,
    db: Db,
    filterFields?: FilterField<Partial<E>> | {}
  ): Promise<E | null>;
  getAll(
    db: Db,
    filterFields?: FilterField<Partial<E>> | {}
  ): Promise<E[] | null>;
  save(element: E, db: Db): Promise<E>;
  updateById(id: string, element: E, db: Db): Promise<boolean>;
  deleteById(id: string, db: Db): Promise<boolean>;
  deleteAll(db: Db);
}

class CrudRepositoryImpl<E> implements CrudRepository<E> {
  protected _collection: string;

  constructor(collection: string) {
    this._collection = collection;
  }

  async getById(
    id: string,
    db: Db,
    filterFields: FilterField<Partial<E>> | {} = {}
  ): Promise<E | null> {
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

    return getResult as E;
  }

  async getAll(
    db: Db,
    filterFields: FilterField<Partial<E>> | {} = {}
  ): Promise<E[] | null> {
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
    return users as E[];
  }

  async save(element: E, db: Db) {
    const insertOneResult = await db
      .collection(this._collection)
      .insertOne(element);
    return element;
  }

  async updateById(id: string, element: E, db: Db): Promise<boolean> {
    const _id = new ObjectId(id);
    const updateResult = await db.collection<E>(this._collection).updateOne(
      { _id },
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

export { CrudRepository, CrudRepositoryImpl };
