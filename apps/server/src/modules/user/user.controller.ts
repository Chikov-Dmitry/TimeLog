import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { PatchUserDto } from './dto/patchUser.dto';
import { SameUser } from '../../common/decorators/sameUser.decorator';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { ChangeUserPasswordDto } from './dto/changeUserPassword.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @SameUser()
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @SameUser()
  @Patch('/:id')
  editUser(@Body() data: PatchUserDto, @Param('id') id: string) {
    if (data['roles'])
      throw new BadRequestException(
        'Запрещено изменять роль при редактировании пользователя',
      );
    if (data['password'])
      throw new BadRequestException(
        'Запрещено изменять пароль при редактировании пользователя',
      );
    if (data['email'])
      throw new BadRequestException(
        'Запрещено изменять email при редактировании пользователя',
      );
    return this.userService.editUser(id, data);
  }

  @Roles(Role.Admin)
  @Patch('/roles/:id')
  changeUserRoles(@Body() data: ChangeUserRoleDto, @Param('id') id: string) {
    const { roles } = data;
    return this.userService.changeRoles(id, { roles });
  }

  @SameUser()
  @Patch('/password/:id')
  changeUserPassword(
    @Body() data: ChangeUserPasswordDto,
    @Param('id') id: string,
  ) {
    const { oldPassword, newPassword } = data;
    return this.userService.changeUserPassword(id, {
      oldPassword,
      newPassword,
    });
  }
}
