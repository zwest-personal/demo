class InvalidPlayError extends Error {
  public constructor(message: string) {
    super(`Invalid Play: ${message}`);
    this.name = 'PlayError';
    Object.setPrototypeOf(this, InvalidPlayError.prototype);
  }
}

export default InvalidPlayError;