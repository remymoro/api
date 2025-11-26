import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { AppError } from '../errors/app-error';
import { errorFactory } from '../errors/error.factory';
import { ValidationError } from 'class-validator';

@Catch()
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // ------------------------------------------------------------
    // 1️⃣ AppError déjà prêt → réponse directe
    // ------------------------------------------------------------
    if (exception instanceof AppError) {
      return response.status(exception.status).json({
        code: exception.code,
        message: exception.message,
        statusCode: exception.status,
        details: exception.details ?? null,
      });
    }

    // ------------------------------------------------------------
    // 2️⃣ HttpException Nest (DTO, Forbidden, Unauthorized...)
    // ------------------------------------------------------------
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errResponse = exception.getResponse() as any;

      // 2a) ValidationError[] complets → erreurs DTO
      if (
        Array.isArray(errResponse?.message) &&
        errResponse.message[0] instanceof ValidationError
      ) {
        return response.status(400).json({
          code: 'VALIDATION_FAILED',
          message: 'Validation error',
          statusCode: 400,
          details: {
            fieldErrors: this.mapClassValidatorErrors(errResponse.message),
          },
        });
      }

      // 2b) message = string[]
      if (Array.isArray(errResponse?.message)) {
        return response.status(status).json({
          code: 'NEST_ERROR',
          message: errResponse.message?.[0] ?? 'Erreur HTTP',
          statusCode: status,
          details: null,
        });
      }

      // 2c) message simple
      return response.status(status).json({
        code: 'NEST_ERROR',
        message: errResponse?.message || 'Erreur HTTP',
        statusCode: status,
        details: null,
      });
    }

    // ------------------------------------------------------------
    // 3️⃣ Tout le reste → envoyer dans error.factory (Prisma, JS...)
    // ------------------------------------------------------------
    const appError = errorFactory(exception);

    return response.status(appError.status).json({
      code: appError.code,
      message: appError.message,
      statusCode: appError.status,
      details: appError.details ?? null,
    });
  }

  // ------------------------------------------------------------
  // Mapping class-validator → fieldErrors
  // ------------------------------------------------------------
  private mapClassValidatorErrors(errors: ValidationError[]) {
    const fieldErrors: Record<string, string> = {};

    for (const err of errors) {
      if (err.property && err.constraints) {
        const messages = Object.values(err.constraints);
        if (messages.length > 0) {
          fieldErrors[err.property] = messages[0];
        }
      }

      if (err.children?.length) {
        Object.assign(fieldErrors, this.mapClassValidatorErrors(err.children));
      }
    }

    return fieldErrors;
  }
}
