export class HttpClientErrorException extends Error{
  constructor (public statusCode: number, message: string) {
    super(`${statusCode}: ${message}`);
  }
}
