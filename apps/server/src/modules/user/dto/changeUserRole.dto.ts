import {
    IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../common/enums/role.enum';

export class ChangeUserRoleDto {
    @ApiProperty({
        example: [Role.User],
        description: 'Роль пользователя',
        required: false,
    })
    @IsEnum(Role, { each: true })
    roles?: Role[];
}
