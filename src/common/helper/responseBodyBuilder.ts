class ResponseBodyBuilder<T = any> {
  private timeStamp: number = Date.now();
  private error: { message: string } = { message: "" };
  private status: number = 200;
  private payload: T | {} = {};

  setError(error: string) {
    this.error.message = error;
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
