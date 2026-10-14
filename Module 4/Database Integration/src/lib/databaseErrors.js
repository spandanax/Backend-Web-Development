class ApplicationError extends Error {
  constructor(message, statusCode, code, cause) {
    super(message, { cause });
    this.name = 'ApplicationError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

function normalizeDatabaseError(error) {
  if (error instanceof ApplicationError) {
    return error;
  }

  switch (error && error.code) {
    case 'P2000':
    case 'P2005':
    case 'P2006':
    case 'P2012':
      return new ApplicationError(
        'The submitted data is invalid',
        422,
        'INVALID_DATA',
        error
      );
    case 'P2002':
      return new ApplicationError(
        'A record with these values already exists',
        409,
        'CONFLICT',
        error
      );
    case 'P2003':
      return new ApplicationError(
        'A related record does not exist',
        409,
        'CONFLICT',
        error
      );
    case 'P2004':
      return new ApplicationError(
        'The database constraint was not satisfied',
        409,
        'CONFLICT',
        error
      );
    case 'P2011':
      return new ApplicationError(
        'A required field is missing',
        422,
        'INVALID_DATA',
        error
      );
    case 'P2025':
      return new ApplicationError(
        'Record not found',
        404,
        'NOT_FOUND',
        error
      );
    default:
      return new ApplicationError(
        'Database operation failed',
        500,
        'DATABASE_ERROR',
        error
      );
  }
}

async function executeDatabaseOperation(operation) {
  try {
    return await operation();
  } catch (error) {
    throw normalizeDatabaseError(error);
  }
}

module.exports = {
  ApplicationError,
  executeDatabaseOperation,
  normalizeDatabaseError
};
