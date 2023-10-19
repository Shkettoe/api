import { Injectable } from '@nestjs/common';
import { CreateUserNoteSettingDto } from './dto/create-user-note-setting.dto';
import { UpdateUserNoteSettingDto } from './dto/update-user-note-setting.dto';

@Injectable()
export class UserNoteSettingsService {
  create(createUserNoteSettingDto: CreateUserNoteSettingDto) {
    return 'This action adds a new userNoteSetting';
  }

  findAll() {
    return `This action returns all userNoteSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userNoteSetting`;
  }

  update(id: number, updateUserNoteSettingDto: UpdateUserNoteSettingDto) {
    return `This action updates a #${id} userNoteSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} userNoteSetting`;
  }
}
