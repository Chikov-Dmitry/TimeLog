import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async registerUser(dto: CreateUserDto): Promise<CreateUserDto>{
        const candidate = await this.userService.findUserByEmail(dto.email)
        if(candidate) throw new BadRequestException(`Пользователь c email ${dto.email} уже существует`)
        return this.userService.create(dto)
    }
}
