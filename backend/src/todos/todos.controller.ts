import {Body, Controller, Delete, Get, Param, Patch, Post, Scope, UseGuards,} from '@nestjs/common';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {User} from '../auth/user-decorator';
import {JwtAuthGuard} from '../auth/jwt-auth-guard';
import {Public} from "../auth/public";

@UseGuards(JwtAuthGuard)
@Controller({
    path: 'todos', scope: Scope.REQUEST,
})
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    @Get() async findAll(@User() userId: string) {
        return this.todosService.findAllByUser(userId);
    }

    @Post() async create(@Body() createTodoDto: CreateTodoDto, @User() userId: string) {
        createTodoDto['userId'] = userId;
        return this.todosService.create(createTodoDto);
    }

    @Delete(':id') async deleteOne(@Param('id') id: string, @User() userId: string) {
        return this.todosService.remove(userId, id);
    }

    @Delete() async deleteAll(@User() userId: string) {
        return this.todosService.removeAllCompletedByUser(userId);
    }

    @Patch(':id') async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @User() userId: string) {
        updateTodoDto['userId'] = userId;
        return await this.todosService.update(id, updateTodoDto);
    }
}
