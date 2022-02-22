import { Db, MongoClient } from "mongodb";

class Database {
  private static readonly URL = "mongodb://localhost:27017";
  private static readonly DB_NAME = "Todo";
  private static db: Db | null = null;
  private static mongoClient: MongoClient = new MongoClient(Database.URL, {
    serverSelectionTimeoutMS: 2000,
  });

  static async connectToDatabase() {
    try {
      await this.mongoClient.connect();
      Database.db = Database.mongoClient.db(Database.DB_NAME);
      console.log("database is connected");
    } catch (error) {
      Database.db = null;
      console.log("database is not connected");
    }
  }

  static async getDb(): Promise<Db | null> {
    if (Database.db?.databaseName) {
      return Database.db;
    }
    await Database.connectToDatabase();
    return Database.db;
  }
}

export default Database;
