import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SameUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;

    const { user } = context.switchToHttp().getRequest().user;

    if (user.id !== userId)
      throw new ForbiddenException(
        'Запрещено выполнять запрос для других пользователей',
      );
    else return true;
  }
}
