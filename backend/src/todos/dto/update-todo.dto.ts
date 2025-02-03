import {IsBoolean, IsDate, IsString} from 'class-validator';

export class UpdateTodoDto {
    @IsString() title: string;

    @IsDate() dueDate: Date;

    @IsString() description: string;

    @IsBoolean() isCompleted: boolean;
}
