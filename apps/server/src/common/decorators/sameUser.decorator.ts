import { applyDecorators, UseGuards } from '@nestjs/common';
import { SameUserGuard } from '../guards/sameUser.guard';

export function SameUser() {
  return applyDecorators(UseGuards(SameUserGuard));
}
