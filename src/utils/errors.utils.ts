export class ErrorUtils {
  static report(reporter: (error: string) => void, error: unknown, props: Record<string, unknown> = {}) {
    if (error instanceof Error) {
      reporter(
        `[REPORTED_ERROR]: ${error.message}\nProperties => ${JSON.stringify(props, null, 2)}\nStack => ${error.stack}`,
      );
    } else {
      reporter(`[REPORTED_ERROR]: ${JSON.stringify(error)}\nProperties => ${JSON.stringify(props, null, 2)}\n`);
    }
  }
}

export class ConflictError extends Error {
  public statusCode = 409;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class NotFoundError extends Error {
  public statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends Error {
  public statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnsupportedMediaTypeError extends Error {
  public statusCode = 415;

  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedMediaTypeError';
    Object.setPrototypeOf(this, UnsupportedMediaTypeError.prototype);
  }
}

export class MethodNotAllowed extends Error {
  public statusCode = 405;

  constructor(message: string) {
    super(message);
    this.name = 'MethodNotAllowed';
    Object.setPrototypeOf(this, MethodNotAllowed.prototype);
  }
}

export class NotImplementedError extends Error {
  public statusCode = 501;

  constructor(message: string) {
    super(message);
    this.name = 'NotImplementedError';
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}
