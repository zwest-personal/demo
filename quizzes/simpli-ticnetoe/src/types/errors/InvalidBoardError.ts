class InvalidBoardError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'BoardError';
    Object.setPrototypeOf(this, InvalidBoardError.prototype);
  }
}

export default InvalidBoardError;