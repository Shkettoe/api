import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'An array of Users',
    type: [User],
  })
  @ApiOperation({
    description: 'Retrieves all users from the database',
    summary: 'all users',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    description: 'Single User',
    type: User,
  })
  @ApiOperation({
    description: 'Retrieves a users with an :id from the database',
    summary: 'user with an :id',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }
}
