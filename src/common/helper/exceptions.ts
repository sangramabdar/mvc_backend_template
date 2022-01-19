class DataBaseConnectionError extends Error {
  private static message: string = "db connection error";
  constructor() {
    super(DataBaseConnectionError.message);
  }
}

class EntityNotFound extends Error {
  private static message: string = "not found";
  constructor(entity: string) {
    super(`${entity} ${EntityNotFound.message}`);
  }
}

class WrongContent extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { DataBaseConnectionError, EntityNotFound, WrongContent };
