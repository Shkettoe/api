import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { UserQuestionStatesService } from 'src/user-question-states/user-question-states.service'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class SolvedGuard implements CanActivate {
  constructor(private readonly uqsService: UserQuestionStatesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const id = Number(request.params.id)
    const user: User = request.current_user as User

    const rated = await this.uqsService.findAll({
      relations: ['question'],
      where: { question: { id }, user: { id: user.id } },
    })
    if (rated.length > 0)
      throw new ForbiddenException(`You've already solved this question`)
    return true
  }
}
