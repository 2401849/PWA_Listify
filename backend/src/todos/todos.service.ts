import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {Todo} from './entities/todo.entity';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) {
    }

    async findAllByUser(userId: string) {
        return this.todoModel.find({userId}).lean();
    }

    async create(createTodoDto: CreateTodoDto) {
        const createdTodo = await this.todoModel.create(createTodoDto);
        return createdTodo.toObject()
    }

    async update(id: string, updateTodoDto: UpdateTodoDto) {
        return this.todoModel.findByIdAndUpdate({_id: id}, updateTodoDto, {new: true})
            .lean();
    }

    async removeAllCompletedByUser(userId: string) {
        return this.todoModel.deleteMany({userId, isCompleted: true}).exec();
    }

    async remove(userId: string, id: string) {
        return this.todoModel.deleteOne({_id: id, userId}).exec();
    }
}
