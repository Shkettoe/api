import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { User } from 'src/users/entities/user.entity'

export class CreateNoteDto {
  @IsString()
  @ApiProperty({
    description: 'title of the deck of flashcards',
    example: 'Cards',
  })
  title: string

  user: User
}
