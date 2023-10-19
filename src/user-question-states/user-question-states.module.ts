import { Module } from '@nestjs/common'
import { UserQuestionStatesService } from './user-question-states.service'
import { UserQuestionStatesController } from './user-question-states.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserQuestionState } from './entities/user-question-state.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserQuestionState])],
  controllers: [UserQuestionStatesController],
  providers: [UserQuestionStatesService],
})
export class UserQuestionStatesModule {}
