import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { RatesService } from './rates.service'
import { CreateRateDto } from './dto/create-rate.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Rate } from './entities/rate.entity'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'
import { QuestionsService } from 'src/questions/questions.service'
import { UserQuestionStatesService } from 'src/user-question-states/user-question-states.service'
import { AuthGuard } from '@nestjs/passport'
import { SolvedGuard } from './guards/solved.guard'

@Controller('notes')
@ApiTags('rates')
export class RatesController {
  constructor(
    private readonly ratesService: RatesService,
    private readonly questionService: QuestionsService,
    private readonly uqsService: UserQuestionStatesService,
  ) {}

  @Post('solve/:id')
  @UseGuards(AuthGuard('jwt'), SolvedGuard)
  @ApiResponse({ description: 'Single Rate' })
  @ApiOperation({
    description:
      'Creates a record in the Rates table, if the rate was set to 5 also creates a record in User-Question-States, signifying that the question was solved',
    summary: 'Solves a question with :id',
  })
  async create(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() createRateDto: CreateRateDto,
  ): Promise<Rate> {
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
  @ApiResponse({ description: 'Array of Rates' })
  @ApiOperation({
    description: 'Retrieves all rates from the database',
    summary: 'Lists all rates',
  })
  findAll(): Promise<Rate[]> {
    return this.ratesService.findAll()
  }

  @Get(':id/rates')
  @ApiResponse({ description: 'Array of Rates' })
  @ApiOperation({
    description:
      'Retrieves all the Rates that are related to the Questions from Note :id, ignoring the duplicates or Rates that occured before the last Reset',
    summary: 'Lists all rates',
  })
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
  @ApiResponse({ description: 'Single Rate' })
  @ApiOperation({
    description: 'Retrieves a single Rate with a :id',
    summary: 'gets a rate with :id',
  })
  findOne(@Param('id') id: number): Promise<Rate> {
    return this.ratesService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
  }
}
