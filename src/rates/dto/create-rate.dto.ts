import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Max, Min } from 'class-validator'
import { Note } from 'src/notes/entities/note.entity'
import { Question } from 'src/questions/entities/question.entity'
import { User } from 'src/users/entities/user.entity'

export class CreateRateDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
  rate: number

  user: User

  note: Note

  question: Question
}
