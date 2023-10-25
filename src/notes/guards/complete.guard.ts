import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Request } from 'express'
import { UserQuestionStatesService } from 'src/user-question-states/user-question-states.service'
import { User } from 'src/users/entities/user.entity'
import { NotesService } from '../notes.service'

@Injectable()
export class CompleteGuard implements CanActivate {
  constructor(
    private readonly notesService: NotesService,
    private readonly uqsService: UserQuestionStatesService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request: Request = context.switchToHttp().getRequest()
    const id: number = Number(request.params.id)
    const user: User = request.current_user as User
    const uns = await this.uqsService.findAll({
      where: {
        user: { id: user.id },
        question: { note: { id } },
      },
      relations: { question: { note: { questions: true } } },
    })

    let flag = false

    uns[0].question.note.questions.map(q => {
      flag = false
      uns.map(u => {
        if (q.id == u.question.id) flag = true
      })
    })

    if (!flag)
      throw new ForbiddenException(
        'You must complete (rate 5) all the questions in this note before reseting it',
      )

    return flag
  }
}
