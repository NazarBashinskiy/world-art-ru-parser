import fetch, { Response } from 'node-fetch';
import { IRequest } from '../interfaces';
import {
  HttpRedirectionException,
  HttpClientErrorException,
  HttpServerErrorException
} from '../exceptions';

export class Request {
  constructor (
    private readonly url: string,
    private readonly headers?: Record<string, string>
  ) {}

  async get (request?: IRequest): Promise<string> {
    const url = this.createQueryString(request?.query);
    const response = await fetch(url, { headers: this.headers, });
    return this.validateResponse(response);
  }

  appendHeaders (headers: Record<string, string>): void {
    Object.assign(this.headers, headers);
  }

  private createQueryString (query?: Record<string, string>): string {
    const url = new URL(this.url);
    if (query) {
      for (const param in query) {
        if (query.hasOwnProperty(param)) {
          url.searchParams.append(param, query[param]);
        }
      }
    }
    return url.toString();
  }

  private async validateResponse (response: Response): Promise<string> {
    if (response.ok) {
      return response.textConverted();
    } else {
      const { status, statusText, } = response;
      if (status >= 300 && status < 400) {
        throw new HttpRedirectionException(status, statusText);
      } else if (status >= 400 && status < 500) {
        throw new HttpClientErrorException(status, statusText);
      } else if (status >= 500) {
        throw new HttpServerErrorException(status, statusText);
      }
    }
  }
}
