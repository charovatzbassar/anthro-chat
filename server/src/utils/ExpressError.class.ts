class ExpressError extends Error {
  public errorMsg: string;
  public status: number;

  constructor(errorMsg: string, status: number) {
    super();
    this.errorMsg = errorMsg;
    this.status = status;
  }
}

export default ExpressError;