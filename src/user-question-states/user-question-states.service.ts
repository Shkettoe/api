import { Injectable } from '@nestjs/common';
import { CreateUserQuestionStateDto } from './dto/create-user-question-state.dto';
import { UpdateUserQuestionStateDto } from './dto/update-user-question-state.dto';

@Injectable()
export class UserQuestionStatesService {
  create(createUserQuestionStateDto: CreateUserQuestionStateDto) {
    return 'This action adds a new userQuestionState';
  }

  findAll() {
    return `This action returns all userQuestionStates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userQuestionState`;
  }

  update(id: number, updateUserQuestionStateDto: UpdateUserQuestionStateDto) {
    return `This action updates a #${id} userQuestionState`;
  }

  remove(id: number) {
    return `This action removes a #${id} userQuestionState`;
  }
}
