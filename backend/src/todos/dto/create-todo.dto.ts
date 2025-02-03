import {IsBoolean, IsDate, IsOptional, IsString} from 'class-validator';

export class CreateTodoDto {
    @IsString() title: string;

    @IsDate() dueDate: Date;

    @IsString() description: string;

    @IsOptional() @IsBoolean() isCompleted?: boolean = false;
}
