import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { User } from 'src/users/entities/user.entity'
import { UserNoteSetting } from 'src/user-note-settings/entities/user-note-setting.entity'
import { UserQuestionState } from 'src/user-question-states/entities/user-question-state.entity'
import { Note } from 'src/notes/entities/note.entity'
import { Question } from 'src/questions/entities/question.entity'
import { Rate } from 'src/rates/entities/rate.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        entities: [
          User,
          Note,
          Question,
          Rate,
          UserNoteSetting,
          UserQuestionState,
        ],
        synchronize: false
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
