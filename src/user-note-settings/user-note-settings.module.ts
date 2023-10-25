import { Module } from '@nestjs/common'
import { UserNoteSettingsService } from './user-note-settings.service'
import { UserNoteSettingsController } from './user-note-settings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserNoteSetting } from './entities/user-note-setting.entity'
import { NotesModule } from 'src/notes/notes.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserNoteSetting]), NotesModule],
  controllers: [UserNoteSettingsController],
  providers: [UserNoteSettingsService],
})
export class UserNoteSettingsModule {}
