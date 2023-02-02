import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Response } from 'express';
import { GLOBAL_LOGGER } from '../shared/constants';

@Catch(TypeORMError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    GLOBAL_LOGGER.error({
      message: 'Query failed on server',
      path: request?.url,
      requestBody: request?.body,
      exceptionResponse: exception,
    });

    response.status(500).json({
      statusCode: 500,
      message: 'Query failed on server',
    });
  }
}
