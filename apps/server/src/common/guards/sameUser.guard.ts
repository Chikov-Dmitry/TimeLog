import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SameUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const paramUserId = request.params.id;
    const bodyUserId = request.body.id

    const user = context.switchToHttp().getRequest().user;

    if (paramUserId) {
      if (user.id !== paramUserId)
        throw new ForbiddenException(
          'Запрещено выполнять запрос для других пользователей',
        );
      else return true;
    }

    if (bodyUserId) {
      if (user.id !== bodyUserId)
        throw new ForbiddenException(
            'Запрещено выполнять запрос для других пользователей',
        );
      else return true;
    }

    throw new BadRequestException('Ошибка проверки пользователя');
  }
}
