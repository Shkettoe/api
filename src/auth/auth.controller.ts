import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { User } from 'src/users/entities/user.entity'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Response, response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { NoSessionGuard } from './guards/no-session.guard'

@Controller('auth')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(NoSessionGuard)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const { jwt, user } = await this.authService
      .register(createUserDto)
      .catch(({ message }) => {
        throw new BadRequestException(message)
      })

    response.cookie('access_token', jwt, { httpOnly: true })
    return user
  }

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'email@mail.com',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(AuthGuard('local'), NoSessionGuard)
  async login(@Req() request, @Res({ passthrough: true }) response: Response) {
    const { user, jwt } = await request.user
    response.cookie('access_token', jwt, { httpOnly: true })
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', { httpOnly: true })
    return 'logged out'
  }
}
