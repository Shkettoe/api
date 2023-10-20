import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email will be used for login purposes',
    example: 'email@mail.com',
  })
  email: string

  @IsString()
  @ApiProperty({ example: 'John' })
  first_name: string

  @IsString()
  @ApiProperty({ example: 'Doe' })
  last_name: string

  @IsString()
  @ApiProperty({
    description: 'A strong and complicated password',
    minLength: 8,
    maxLength: 32,
  })
  @MinLength(8)
  @MaxLength(32)
  password: string
}
