import { Injectable } from '@nestjs/common'
import { CreateUserNoteSettingDto } from './dto/create-user-note-setting.dto'
import { UpdateUserNoteSettingDto } from './dto/update-user-note-setting.dto'
import { AbstraitService } from 'src/common/services/service.service'
import { UserNoteSetting } from './entities/user-note-setting.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserNoteSettingsService extends AbstraitService<UserNoteSetting> {
  constructor(
    @InjectRepository(UserNoteSetting)
    private readonly unsRepository: Repository<UserNoteSetting>,
  ) {
    super(unsRepository)
  }

  create(
    createUserNoteSettingDto: CreateUserNoteSettingDto,
  ): Promise<UserNoteSetting> {
    const uns = this.unsRepository.create(createUserNoteSettingDto)
    return this.unsRepository.save(uns)
  }

  update(id: number, updateUserNoteSettingDto: UpdateUserNoteSettingDto) {
    return `This action updates a #${id} userNoteSetting`
  }

  remove(id: number) {
    return `This action removes a #${id} userNoteSetting`
  }
}
