import { HttpException, HttpStatus } from '@nestjs/common';

export const UnprocessableEntityError = (
  message = 'Entity not found',
): HttpException => {
  return new HttpException(
    {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      error: message,
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};
