// src/errors.ts
export class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "NotFoundError";
    }
  }
  
  export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  export class InsufficientQuantityError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InsufficientQuantityError";
    }
  }
  