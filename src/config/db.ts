import { Db, MongoClient } from "mongodb";

class Database {
  private static readonly URL = "mongodb://localhost:27017";
  private static readonly DB_NAME = "practice-expressjs";
  private static db: Db | null = null;
  private static mongoClient: MongoClient;

  static async connectToDatabse() {
    try {
      this.mongoClient = await new MongoClient(Database.URL, {
        serverSelectionTimeoutMS: 2000,
      }).connect();
      Database.db = Database.mongoClient.db(Database.DB_NAME);
      console.log("database is connected");
    } catch (error) {
      console.log("database is not connected");
    }
  }

  static async getDb(): Promise<Db | null> {
    console.log("getDb");

    //this is for checking db object is still alive or not
    try {
      Database.db!!.databaseName;
    } catch (error) {
      Database.db = null;
    }

    if (!Database.db) await Database.connectToDatabse();
    return Database.db;
  }
}

export default Database;
