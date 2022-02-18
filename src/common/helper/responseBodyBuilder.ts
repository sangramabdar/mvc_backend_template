class ResponseBodyBuilder<T = any> {
  private timeStamp: number;
  private error: string;
  private statusCode: number;
  private payload: T | {};

  constructor(
    error: string = "",
    payload: T | {} = {},
    statusCode: number = 200
  ) {
    this.timeStamp = Date.now();
    this.error = error;
    this.statusCode = statusCode;
    this.payload = payload;
  }

  setError(error: string) {
    this.error = error;
    return this;
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  setPayload(payload: T) {
    this.payload = payload;
    return this;
  }

  build() {
    return this;
  }
}

export default ResponseBodyBuilder;
