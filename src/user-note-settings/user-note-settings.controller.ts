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

@Controller('user-note-settings')
@ApiTags('users-note-settings')
export class UserNoteSettingsController {
  constructor(
    private readonly userNoteSettingsService: UserNoteSettingsService,
  ) {}

  @Post()
  create(@Body() createUserNoteSettingDto: CreateUserNoteSettingDto) {
    return this.userNoteSettingsService.create(createUserNoteSettingDto)
  }

  @Get()
  findAll() {
    return this.userNoteSettingsService.findAll()
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
