import { Db, MongoClient } from "mongodb";

class Database {
  private static readonly URL = "mongodb://localhost:27017";
  private static readonly DB_NAME = "practice-expressjs";
  private static db: Db | null = null;
  private static mongoClient: MongoClient = new MongoClient(Database.URL, {
    serverSelectionTimeoutMS: 2000,
  });

  static async connectToDatabse() {
    await this.mongoClient.connect();
    Database.db = Database.mongoClient.db(Database.DB_NAME);
    console.log("database is connected");
  }

  static async getDb(): Promise<Db | null> {
    if (!Database.db) await Database.connectToDatabse();

    return Database.db;
  }
}

export default Database;
