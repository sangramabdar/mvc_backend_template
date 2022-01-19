class ResponseBodyBuilder<T> {
  private timeStamp: number;
  private error: string;
  private status: number;
  private payload: T | {};

  constructor(error: string = "", payload: T | {} = {}, status: number = 200) {
    this.timeStamp = Date.now();
    this.error = error;
    this.status = status;
    this.payload = payload;
  }

  setError(error: string) {
    this.error = error;
    return this;
  }

  setStatus(status: number) {
    this.status = status;
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
