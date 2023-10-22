import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @note must be above /:id route or else it will
     parse /me as an :id param
   *
   * @param user
   * @returns 
   */
  @Get('me')
  me(@CurrentUser() user: User): User {
    return user
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }
}
