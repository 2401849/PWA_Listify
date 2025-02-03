import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './entities/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {DeleteUserDto} from './dto/delete-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({username}).lean();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
        return this.userModel
            .findByIdAndUpdate({_id: id}, updateUserDto, {new: true})
            .lean()
    }

    async remove(id: string, deleteUserDto: DeleteUserDto) {
        return this.userModel.deleteOne({_id: id}, deleteUserDto).exec();
    }
}