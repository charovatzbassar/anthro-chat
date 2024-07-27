class ExpressError extends Error {
  constructor(public errorMsg: string, public status: number) {
    super();
    this.errorMsg = errorMsg;
    this.status = status;
  }
}

export default ExpressError;
