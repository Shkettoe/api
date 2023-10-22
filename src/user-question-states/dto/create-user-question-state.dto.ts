import { Question } from 'src/questions/entities/question.entity'
import { User } from 'src/users/entities/user.entity'

export class CreateUserQuestionStateDto {
  user: User

  question: Question
}
