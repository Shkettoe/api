import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common'
import { UserNoteSettingsService } from './user-note-settings.service'
import { CreateUserNoteSettingDto } from './dto/create-user-note-setting.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { CompleteGuard } from 'src/notes/guards/complete.guard'
import { UserQuestionStatesService } from 'src/user-question-states/user-question-states.service'

@Controller('user-note-settings')
@ApiTags('users-note-settings')
export class UserNoteSettingsController {
  constructor(
    private readonly unsService: UserNoteSettingsService,
    private readonly uqsService: UserQuestionStatesService,
  ) {}

  @Post(':id')
  @ApiResponse({
    description: 'Single Setting',
  })
  @ApiOperation({
    description:
      'Creates a new record in User-Note-Settings table that signifies the moment Current User has reset the stats of the Note :id',
    summary: 'resets the note :id',
  })
  @UseGuards(AuthGuard('jwt'), CompleteGuard)
  async create(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() createUserNoteSettingDto: CreateUserNoteSettingDto,
  ) {
    createUserNoteSettingDto.user = user
    createUserNoteSettingDto.note_id = id

    const uqsToDelete = await this.uqsService.findAll({
      where: {
        question: {
          note: {
            id,
          },
        },
      },
    })

    uqsToDelete.forEach(u => this.uqsService.remove(u))

    return this.unsService.create(createUserNoteSettingDto)
  }

  // @Get()
  // findAll() {
  //   return this.unsService.findAll({ relations: { note: true } })
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.unsService.findOne(+id)
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserNoteSettingDto: UpdateUserNoteSettingDto,
  // ) {
  //   return this.unsService.update(+id, updateUserNoteSettingDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.unsService.remove(+id)
  // }
}
