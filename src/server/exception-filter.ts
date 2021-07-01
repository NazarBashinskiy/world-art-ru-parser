import { NotFoundException } from '../common/exceptions/not-found.exception';
import { BadRequestException } from '../common/exceptions/bad-request.exception';

export function exceptionFilter (error: unknown, req, res) {
  if (error instanceof NotFoundException) {
    res.statusCode(404).json({
      errorType: 'Not Found',
      message: error.message
    });
  } else if (error instanceof BadRequestException) {
    res.statusCode(400).json({
      errorType: 'Bad Request',
      message: error.message
    });
  } else {
    res.statusCode(500).json({
      errorType: 'Internal Server Error'
    });
  }
}
