type CallBack<T> = {
  callback: (value: T) => boolean;
  error: string;
};

type SchemaType<T> = {
  [K in keyof T]: Schema<T[K]>;
};

function SchemaObject<T = {}>(schema: SchemaType<Partial<T>>) {
  return schema;
}

class Schema<T> {
  protected callbacks: Array<CallBack<T>> = [];
  protected type: string = "";
  protected key: string = "";
  protected values: T[] = [];

  constructor(key: string) {
    this.key = key;
  }

  validate(value: T) {
    //type validation
    if (typeof value !== this.type) {
      throw new Error(`${this.key} must be ${this.type}`);
    }

    //constraint validation
    for (let { callback, error } of this.callbacks) {
      if (!callback(value)) {
        throw new Error(error);
      }
    }
  }

  #contains = (name: T) => {
    for (let value of this.values) {
      if (value === name) return true;
    }
    return false;
  };

  of(values: T[]) {
    let s = "";
    values.forEach((element, index) => {
      if (index === values.length - 1) {
        s += element;
        return;
      }
      s += element + " or ";
    });

    this.values = values;
    this.callbacks.push({
      callback: this.#contains,
      error: `${this.key} must be ${s}`,
    });
    return this;
  }
}

class StringSchema extends Schema<string> {
  protected maxLength: number = 0;
  protected minLength: number = 0;

  constructor(key: string) {
    super(key);
    this.type = "string";
  }

  #max = (name: string) => name.trimStart().trimEnd().length <= this.maxLength;
  #min = (name: string) => name.trimStart().trimEnd().length >= this.minLength;

  #onlyAlphabates = (name: string) => {
    let newData = name.trimStart().trimEnd();
    let format = /^[A-Za-z]+$/;

    if (!format.test(newData)) return false;

    return true;
  };

  #onlyDigits = (name: string) => {
    let format = /^[0-9]+$/;

    if (!format.test(name)) return false;
    return true;
  };

  #isEmail = (name: string) => {
    let format =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!format.test(name)) return false;
    return true;
  };

  max(length: number) {
    this.maxLength = length;
    this.callbacks.push({
      callback: this.#max,
      error: `name should contain at most ${length} characters,`,
    });
    return this;
  }

  min(length: number) {
    this.minLength = length;
    this.callbacks.push({
      callback: this.#min,
      error: `name should contain at least ${length} characters,`,
    });
    return this;
  }

  onlyAplhabates() {
    this.callbacks.push({
      callback: this.#onlyAlphabates,
      error: `${this.key} should contain only aplphabates`,
    });
    return this;
  }

  onlyDigits() {
    this.callbacks.push({
      callback: this.#onlyDigits,
      error: `${this.key} should contain only numbers`,
    });
    return this;
  }

  email() {
    this.callbacks.push({
      callback: this.#isEmail,
      error: `${this.key} must be a valid email`,
    });
    return this;
  }
}

class NumberSchema extends Schema<number> {
  protected maxNumber: number = 0;
  protected minNUmber: number = 0;

  constructor(key: string) {
    super(key);
    this.type = "number";
  }

  #isNotNegative = (value: number) => value >= 0;
  #max = (value: number) => value <= this.maxNumber;
  #min = (value: number) => value >= this.minNUmber;

  max(value: number) {
    this.maxNumber = value;
    this.callbacks.push({
      callback: this.#max,
      error: `${this.key} should be less than ${this.maxNumber}`,
    });
    return this;
  }

  min(value: number) {
    this.minNUmber = value;
    this.callbacks.push({
      callback: this.#min,
      error: `${this.key} should be greater than ${this.minNUmber}`,
    });
    return this;
  }

  notNegative() {
    this.callbacks.push({
      callback: this.#isNotNegative,
      error: `${this.key} must not be negative`,
    });
    return this;
  }
}

async function validateSchema<T>(
  entity: {},
  body: {},
  method: "POST" | "PUT"
): Promise<{}> {
  let newObject = {};

  switch (method) {
    case "POST":
      var keys = Object.keys(entity);

      for (let key of keys) {
        if (!(key in body)) {
          throw new Error(`${key} must be there`);
        }
        entity[key].validate(body[key]);
        newObject[key] = body[key];
      }
      break;

    case "PUT":
      var keys = Object.keys(body);

      for (let key of keys) {
        if (key in entity) {
          entity[key].validate(body[key]);
          newObject[key] = body[key];
        }
      }
      break;
  }
  return newObject;
}

export { Schema, StringSchema, NumberSchema, validateSchema, SchemaObject };
