import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { NotesModule } from './notes/notes.module'
import { UserNoteSettingsModule } from './user-note-settings/user-note-settings.module'
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [DatabaseModule, UsersModule, NotesModule, UserNoteSettingsModule, FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
