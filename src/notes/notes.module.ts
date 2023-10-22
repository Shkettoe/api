import { Module } from '@nestjs/common'
import { NotesService } from './notes.service'
import { NotesController } from './notes.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Note } from './entities/note.entity'
import { QuestionsService } from 'src/questions/questions.service'
import { QuestionsController } from 'src/questions/questions.controller'
import { Question } from 'src/questions/entities/question.entity'
import { RatesController } from 'src/rates/rates.controller'
import { RatesService } from 'src/rates/rates.service'
import { Rate } from 'src/rates/entities/rate.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Rate]),
  ],
  controllers: [NotesController, QuestionsController, RatesController],
  providers: [NotesService, QuestionsService, RatesService],
})
export class NotesModule {}
