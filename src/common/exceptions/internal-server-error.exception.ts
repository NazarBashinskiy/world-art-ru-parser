export class InternalServerErrorException extends Error {
  constructor (message?: string) {
    let errorMessage = 'Internal Server Error';
    if (message) {
      errorMessage += `: ${message}`;
    }
    super(errorMessage);
  }
}
