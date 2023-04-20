import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import {BadRequestException, Injectable} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  @InjectModel(User.name) private model: Model<UserDocument>;

  async findUserByEmail(email: string){
    return this.model.findOne({email})
  }

  async create(data: CreateUserDto) {
    const candidate = await this.findUserByEmail(data.email)
    if(candidate) throw new BadRequestException(`Пользователь c email ${data.email} уже существует`)
    return this.model.create(data);
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}
