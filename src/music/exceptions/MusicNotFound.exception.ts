import { HttpException, HttpStatus } from '@nestjs/common';

export class MusicNotFoundException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'User Not found', status || HttpStatus.NOT_FOUND);
  }
}
