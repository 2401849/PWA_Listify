import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: Date })
    dueDate: Date;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ default: false, type: Boolean })
    isCompleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
