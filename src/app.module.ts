import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { NotesModule } from './notes/notes.module'
import { QuestionsModule } from './questions/questions.module'
import { RatesModule } from './rates/rates.module'
import { UserQuestionStatesModule } from './user-question-states/user-question-states.module'
import { UserNoteSettingsModule } from './user-note-settings/user-note-settings.module'

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    NotesModule,
    QuestionsModule,
    RatesModule,
    UserQuestionStatesModule,
    UserNoteSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
