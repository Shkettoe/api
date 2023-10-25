import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { User } from 'src/users/entities/user.entity'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Response, response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { NoSessionGuard } from './guards/no-session.guard'
import { CurrentUser } from './decorators/current_user.decorator'

@Controller('auth')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @note must be above /:id route or else it will
     parse /me as an :id param
   *
   * @param user
   * @returns 
   */
  @Get('me')
  @ApiResponse({ description: 'Signle User', type: User })
  @ApiOperation({
    description: 'Returns a user that is currently logged in',
    summary: 'currently logged in user',
  })
  me(@CurrentUser() user: User): User {
    return user
  }

  @Post('register')
  @ApiResponse({ description: 'Signle User', type: User })
  @ApiOperation({
    description:
      'Creates a new user record in the database with createUserDto information and automatically logs the user in',
    summary: 'registers a new user',
  })
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
  @ApiResponse({ description: 'Signle User', type: User })
  @ApiOperation({
    description:
      'Logs the user in by signing an access token, if the user credentials are correct',
    summary: 'logs the user in',
  })
  @UseGuards(AuthGuard('local'), NoSessionGuard)
  async login(@Req() request, @Res({ passthrough: true }) response: Response) {
    const { user, jwt } = await request.user
    response.cookie('access_token', jwt, { httpOnly: true })
    return user
  }

  @Post('logout')
  @ApiResponse({ description: 'Log out message', type: String })
  @ApiOperation({
    description: 'Logs the user out by removing the access token',
    summary: 'logs the user out',
  })
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', { httpOnly: true })
    return 'logged out'
  }
}
