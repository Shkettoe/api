import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Note } from 'src/notes/entities/note.entity'

export class CreateQuestionDto {
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  question: string

  @IsString()
  @ApiProperty({
    type: 'string',
  })
  answer: string

  note: Note
}
