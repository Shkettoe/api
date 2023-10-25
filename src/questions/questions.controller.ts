import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common'
import { QuestionsService } from './questions.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotesService } from 'src/notes/notes.service'
import { AuthGuard } from '@nestjs/passport'
import { Question } from './entities/question.entity'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'
import { IsNull, Not } from 'typeorm'

@Controller('notes')
@ApiTags('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly notesService: NotesService,
  ) {}

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'Single Question',
  })
  @ApiOperation({
    description: 'Creates a new Question inside the note with an :id',
    summary: 'creates new question',
  })
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
  @ApiResponse({
    description: 'Single Question',
  })
  @ApiOperation({
    description: 'Retrieves a single Question with an :id',
    summary: 'gets question with :id',
  })
  findOne(@Param('id') id: number): Promise<Question> {
    return this.questionsService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
  }

  @Get(':id/finished')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'Array of Questions',
  })
  @ApiOperation({
    description:
      'Returns percentage of questions completed by the Current User in Note :id and also returns all the questions too.',
    summary:
      'gets percentage of finished questions along with questions from note :id',
  })
  async findFinished(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<[number, Question[]]> {
    const all = await this.questionsService.findAll({ where: { note: { id } } })
    const finished = await this.questionsService.findAll({
      relations: ['note'],
      where: {
        note: { id },
        finished_by_users: { user: { id: user.id } },
      },
    })
    const perc = (finished.length * 100) / all.length
    return [perc, finished]
  }

  @Get(':id/questions')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'Array of Questions',
  })
  @ApiOperation({
    description:
      "Returns questions from the Note :id that weren't finished by Current User",
    summary: 'questions from Note :id',
  })
  async getQuestions(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<Question[]> {
    const questions = await this.questionsService.findAll({
      where: {
        note: { id },
        finished_by_users: [{ id: IsNull() }, { user: { id: Not(user.id) } }],
      },
    })
    return questions
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
