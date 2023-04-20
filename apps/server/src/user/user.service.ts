import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  @InjectModel(User.name) private model: Model<UserDocument>;

  create(data: User) {
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
