class ExpressError extends Error {
  constructor(public errorMsg: string, public status: number) {
    super();
  }
}

export default ExpressError;
