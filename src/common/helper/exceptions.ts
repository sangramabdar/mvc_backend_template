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

class EmailExists extends Error {
  private static message: string = "email already exists";
  constructor() {
    super(EmailExists.message);
  }
}

class NotRegistered extends Error {
  private static message: string = "email is not registered";
  constructor() {
    super(NotRegistered.message);
  }
}

export {
  DataBaseConnectionError,
  EntityNotFound,
  WrongContent,
  EmailExists,
  NotRegistered,
};
