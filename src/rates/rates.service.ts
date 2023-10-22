import { Injectable } from '@nestjs/common'
import { CreateRateDto } from './dto/create-rate.dto'
import { AbstraitService } from 'src/common/services/service.service'
import { Rate } from './entities/rate.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RatesService extends AbstraitService<Rate> {
  constructor(
    @InjectRepository(Rate) private readonly rateRepository: Repository<Rate>,
  ) {
    super(rateRepository)
  }

  create(createRateDto: CreateRateDto): Promise<Rate> {
    const rate = this.rateRepository.create(createRateDto)
    return this.rateRepository.save(rate)
  }
}
