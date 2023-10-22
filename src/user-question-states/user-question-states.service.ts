import { Injectable } from '@nestjs/common'
import { CreateUserQuestionStateDto } from './dto/create-user-question-state.dto'
import { AbstraitService } from 'src/common/services/service.service'
import { UserQuestionState } from './entities/user-question-state.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserQuestionStatesService extends AbstraitService<UserQuestionState> {
  constructor(
    @InjectRepository(UserQuestionState)
    private readonly uqsRepository: Repository<UserQuestionState>,
  ) {
    super(uqsRepository)
  }

  create(
    createUserQuestionStateDto: CreateUserQuestionStateDto,
  ): Promise<UserQuestionState> {
    const uqs = this.uqsRepository.create(createUserQuestionStateDto)
    return this.uqsRepository.save(uqs)
  }

  remove(id: number) {
    return `This action removes a #${id} userQuestionState`
  }
}
