import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common'
import { RatesService } from './rates.service'
import { CreateRateDto } from './dto/create-rate.dto'
import { ApiTags } from '@nestjs/swagger'
import { Rate } from './entities/rate.entity'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'
import { QuestionsService } from 'src/questions/questions.service'

@Controller('notes')
@ApiTags('rates')
export class RatesController {
  constructor(
    private readonly ratesService: RatesService,
    private readonly questionService: QuestionsService,
  ) {}

  @Post('solve/:id')
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
    return this.ratesService.create(createRateDto)
  }

  @Get('rates/all')
  findAll() {
    return this.ratesService.findAll()
  }

  @Get('rates/:id')
  findOne(@Param('id') id: number): Promise<Rate> {
    return this.ratesService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
  }
}
