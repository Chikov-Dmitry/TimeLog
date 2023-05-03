import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException, BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SameUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const paramUserId = request.params.id;

    const { user } = context.switchToHttp().getRequest().user;

    if(paramUserId){
      if (user.id !== paramUserId)
        throw new ForbiddenException(
            'Запрещено выполнять запрос для других пользователей',
        );
      else return true;
    }

    const bodyEmail = request.body.email

    if(bodyEmail){
      if (user.email !== bodyEmail)
        throw new ForbiddenException(
            'Запрещено выполнять запрос для других пользователей',
        );
      else return true;
    }

    throw new BadRequestException("Ошибка проверки пользователя")


  }
}
