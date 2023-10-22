import { Injectable } from '@nestjs/common'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { AbstraitService } from 'src/common/services/service.service'
import { Question } from './entities/question.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class QuestionsService extends AbstraitService<Question> {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
    super(questionRepository)
  }

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto)
    return this.questionRepository.save(question)
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`
  }

  remove(id: number) {
    return `This action removes a #${id} question`
  }
}
