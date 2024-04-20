export class BadEntityError extends Error {
  entity: any
  constructor(message: string, entity: any) {
      super(`ENTITY Error: ${message}`)
      this.entity = entity
  }
}

export class RecordConflictError extends Error {
  errors: any
  constructor(message: string, errors: any) {
      super(message)
      this.errors = errors
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
      super(`RECORD NOT FOUND: ${message}`)
  }
}

export class BadRequestError extends Error {
  errors: any
  constructor(message: string, errors: any) {
      super(message)
      this.errors = errors
  }
}

export class ApiServiceError extends Error {
  constructor(message: string) {
      super(`API SERVICE_ERROR: ${message}`)
  }
}

export class ApiError extends Error {
  constructor(message: string) {
      super(`API ERROR: ${message}`)
  }
}