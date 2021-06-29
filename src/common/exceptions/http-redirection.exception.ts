export class HttpRedirectionException extends Error {
  constructor (public statusCode: number, message: string) {
    super(`${statusCode}: ${message}`);
  }
}
