import { HttpStatus } from '@nestjs/common';

export const badRequestResponse = (
  res,
  message,
  data = [],
  statusCode = 400,
) => {
  return res.status(statusCode).json({
    statusCode,
    error: 'Bad request',
    message,
    data,
  });
};

export const notFoundResponse = (res, message, data = [], statusCode = 404) => {
  return res.status(statusCode).json({
    statusCode,
    error: 'Not found exception',
    message,
    data,
  });
};

export const conflictErrorResponse = (res, message, statusCode = 409) => {
  return res.status(statusCode).json({
    statusCode,
    error: 'Conflict error',
    message,
  });
};

export const serverErrorResponse = (
  res,
  message = 'Internal server error',
  statusCode = 500,
) => {
  return res.status(statusCode).json({
    statusCode,
    error: 'Internal Server Error',
    message,
  });
};
export const okResponseFormat = (
  message = 'Success',
  data: any = [],
  customStatusCode = 0,
) => {
  return { message, data, customStatusCode };
};
