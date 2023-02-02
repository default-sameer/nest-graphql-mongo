import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'User already exist', status || HttpStatus.CONFLICT);
  }
}
