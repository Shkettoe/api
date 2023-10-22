import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { NotesModule } from './notes/notes.module'
import { UserQuestionStatesModule } from './user-question-states/user-question-states.module'
import { UserNoteSettingsModule } from './user-note-settings/user-note-settings.module'

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    NotesModule,
    UserQuestionStatesModule,
    UserNoteSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
