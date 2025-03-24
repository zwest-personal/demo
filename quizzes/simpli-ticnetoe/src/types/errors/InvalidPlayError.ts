class InvalidPlayError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'PlayError';
    Object.setPrototypeOf(this, InvalidPlayError.prototype);
  }
}

export default InvalidPlayError;