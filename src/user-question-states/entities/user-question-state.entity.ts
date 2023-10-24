import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Question } from 'src/questions/entities/question.entity'
import { User } from 'src/users/entities/user.entity'
import { Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class UserQuestionState extends AbstraitEntity {
  @ManyToOne(() => User, user => user.finished_questions, {
    onDelete: 'CASCADE',
  })
  user: User

  @ManyToOne(() => Question, question => question.finished_by_users, {
    onDelete: 'CASCADE',
  })
  question: Question
}
