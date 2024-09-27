import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { DISABLE_GLOBAL_INTERCEPTOR } from '@app/common/interceptors/response/decorators/disable-global-interceptor.decorator';
import { TRANSFORM_DTO } from '@app/common/interceptors/response/decorators/transform-dto.decorator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const disabledInterceptor = this.reflector.getAllAndOverride<boolean>(DISABLE_GLOBAL_INTERCEPTOR, [
      context.getHandler,
      context.getClass(),
    ]);

    if (disabledInterceptor) {
      next.handle();
    }

    const dtoClass = this.reflector.getAllAndOverride<ClassConstructor<any>>(TRANSFORM_DTO, [
      context.getHandler(),
      context.getClass(),
    ]);

    return next.handle().pipe(
      map((data) => {
        if (dtoClass) {
          if (Array.isArray(data)) {
            return {
              data: data.map((item) => {
                const transformedItem = plainToInstance(dtoClass, item, {
                  excludeExtraneousValues: true,
                });
                transformedItem.id = item._id;
                return transformedItem;
              }),
            };
          } else {
            const transformedItem = plainToInstance(dtoClass, data, {
              excludeExtraneousValues: true,
            });
            transformedItem.id = data._id;
            return {
              data: transformedItem,
            };
          }
        }

        return {
          data: data || (Array.isArray(data) ? [] : {}),
        };
      }),
    );
  }
}
