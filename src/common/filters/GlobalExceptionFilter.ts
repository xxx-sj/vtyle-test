import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = 400;

    response.code(status).send({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
    });
  }
}
