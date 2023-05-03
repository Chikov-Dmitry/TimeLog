import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { PatchUserDto } from './dto/patchUser.dto';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { Role } from '../../common/enums/role.enum';
import { ChangeUserPasswordDto } from './dto/changeUserPassword.dto';

@Injectable()
export class UserService {
  @InjectModel(User.name) private model: Model<UserDocument>;

  async findUserByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, 10);
    return this.model.create(data);
  }

  findAll() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  async editUser(id: string, data: PatchUserDto) {
    const candidate = await this.findById(id);
    await candidate.updateOne(data);
    await candidate.save();
    return this.findById(id);
  }

  async changeRoles(id: string, data: ChangeUserRoleDto) {
    const candidate = await this.findById(id);
    await candidate.updateOne(data);
    await candidate.save();
    return this.findById(id);
  }

  async getUserRoles(id: string): Promise<Role[]> {
    const user = await this.findById(id);
    return user.roles;
  }

  async changeUserPassword(id, data: ChangeUserPasswordDto) {
    const user = await this.findById(id);

    const validatePassword = await bcrypt.compare(
      data.oldPassword,
      user.password,
    );
    if (!validatePassword)
      throw new BadRequestException('Не верно указан старый пароль');

    user.password = await bcrypt.hash(data.newPassword, 10);
    user.save();
    return user;
  }
}
