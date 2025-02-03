import {Body, Controller, Delete, Get, Param, Patch, Post, Scope, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {Public} from "../auth/public";
import {User} from "../auth/user-decorator";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {Admin} from "../auth/admin";

@UseGuards(JwtAuthGuard)
@Admin()
@Controller({
    path: 'users', scope: Scope.REQUEST,
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Public() @Post() async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get() async findAll() {
        return this.usersService.findAll();
    }

    @Patch(':id') async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') async remove(@Param('id') id: string, @Body() deleteUserDto: DeleteUserDto) {
        return this.usersService.remove(id, deleteUserDto);
    }
}