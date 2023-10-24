import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UserNoteSettingsService } from './user-note-settings.service'
import { CreateUserNoteSettingDto } from './dto/create-user-note-setting.dto'
import { UpdateUserNoteSettingDto } from './dto/update-user-note-setting.dto'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'

@Controller('user-note-settings')
@ApiTags('users-note-settings')
export class UserNoteSettingsController {
  constructor(
    private readonly userNoteSettingsService: UserNoteSettingsService,
  ) {}

  @Post(':id')
  create(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() createUserNoteSettingDto: CreateUserNoteSettingDto,
  ) {
    createUserNoteSettingDto.user = user
    createUserNoteSettingDto.note_id = id
    return this.userNoteSettingsService.create(createUserNoteSettingDto)
  }

  @Get()
  findAll() {
    return this.userNoteSettingsService.findAll({ relations: { note: true } })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userNoteSettingsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserNoteSettingDto: UpdateUserNoteSettingDto,
  ) {
    return this.userNoteSettingsService.update(+id, updateUserNoteSettingDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userNoteSettingsService.remove(+id)
  }
}
