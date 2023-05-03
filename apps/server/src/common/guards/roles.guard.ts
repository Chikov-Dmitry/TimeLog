import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const reqUser = context.switchToHttp().getRequest().user;
    const userRoles = await this.userService.getUserRoles(reqUser.id);
    const can = requiredRoles.some((role) => userRoles.includes(role));
    if (!can) throw new ForbiddenException('Доступ запрещен');
    else return true;
  }
}
