import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { ApiTags } from '@nestjs/swagger'
import { NotesService } from 'src/notes/notes.service'
import { AuthGuard } from '@nestjs/passport'
import { Question } from './entities/question.entity'

@Controller('notes')
@ApiTags('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly notesService: NotesService,
  ) {}

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  async createQuestion(
    @Param('id') id: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const note = await this.notesService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
    createQuestionDto.note = note
    return await this.questionsService
      .create(createQuestionDto)
      .catch(({ message }) => {
        throw new BadRequestException(message)
      })
  }

  @Get('question/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number): Promise<Question> {
    return this.questionsService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  // ) {
  //   return this.questionsService.update(+id, updateQuestionDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.questionsService.remove(+id)
  // }
}
