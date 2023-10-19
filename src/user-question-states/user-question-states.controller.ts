import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserQuestionStatesService } from './user-question-states.service';
import { CreateUserQuestionStateDto } from './dto/create-user-question-state.dto';
import { UpdateUserQuestionStateDto } from './dto/update-user-question-state.dto';

@Controller('user-question-states')
export class UserQuestionStatesController {
  constructor(private readonly userQuestionStatesService: UserQuestionStatesService) {}

  @Post()
  create(@Body() createUserQuestionStateDto: CreateUserQuestionStateDto) {
    return this.userQuestionStatesService.create(createUserQuestionStateDto);
  }

  @Get()
  findAll() {
    return this.userQuestionStatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userQuestionStatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQuestionStateDto: UpdateUserQuestionStateDto) {
    return this.userQuestionStatesService.update(+id, updateUserQuestionStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQuestionStatesService.remove(+id);
  }
}
