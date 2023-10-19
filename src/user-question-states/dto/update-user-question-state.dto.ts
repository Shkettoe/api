import { PartialType } from '@nestjs/mapped-types';
import { CreateUserQuestionStateDto } from './create-user-question-state.dto';

export class UpdateUserQuestionStateDto extends PartialType(CreateUserQuestionStateDto) {}
