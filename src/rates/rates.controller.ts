import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common'
import { RatesService } from './rates.service'
import { CreateRateDto } from './dto/create-rate.dto'
import { ApiTags } from '@nestjs/swagger'
import { Rate } from './entities/rate.entity'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'
import { QuestionsService } from 'src/questions/questions.service'
import { UserQuestionStatesService } from 'src/user-question-states/user-question-states.service'
import { AuthGuard } from '@nestjs/passport'
import { response } from 'express'
import { IsNull, LessThan, Not } from 'typeorm'

@Controller('notes')
@ApiTags('rates')
export class RatesController {
  constructor(
    private readonly ratesService: RatesService,
    private readonly questionService: QuestionsService,
    private readonly uqsService: UserQuestionStatesService,
  ) {}

  @Post('solve/:id')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() createRateDto: CreateRateDto,
  ): Promise<Rate> {
    const rated = await this.uqsService.findAll({
      relations: ['question'],
      where: { question: { id }, user: { id: user.id } },
    })
    if (rated.length)
      throw new ForbiddenException(`You have solved this question already`)
    createRateDto.user = user
    createRateDto.question = await this.questionService
      .findOne(id, ['note'])
      .catch(({ message }) => {
        throw new NotFoundException(message)
      })
    createRateDto.note = createRateDto.question.note
    const rate = await this.ratesService.create(createRateDto)
    if (rate.rate == 5)
      await this.uqsService.create({ user, question: createRateDto.question })
    return rate
  }

  @Get('all/rates')
  findAll(): Promise<Rate[]> {
    return this.ratesService.findAll()
  }

  @Get(':id/rates')
  @UseGuards(AuthGuard('jwt'))
  async findPerNote(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<Rate[]> {
    const rates = await this.ratesService.findAll({
      where: {
        note: {
          id,
        },
        // doesn't work with just 'user' for some reason
        user: {
          id: user.id,
        },
      },

      order: { created_at: 'ASC' },
      relations: {
        question: true,
        note: {
          settings: { user: true },
        },
      },
      loadEagerRelations: false,
    })

    const res: Rate[] = []

    rates.map((r: Rate) => {
      r.note.settings.map(s => {
        if (s.user.id == user.id) {
          if (s.created_at < r.created_at) res.push(r)
        }
      })
    })

    return [
      ...new Map(res.map((rate: Rate) => [rate.question.id, rate])).values(),
    ]
  }

  @Get('rates/:id')
  findOne(@Param('id') id: number): Promise<Rate> {
    return this.ratesService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
  }
}
