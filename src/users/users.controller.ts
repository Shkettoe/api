import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
