import { Injectable } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AbstraitService } from 'src/common/services/service.service'
import { Note } from './entities/note.entity'
import { Repository } from 'typeorm'

@Injectable()
export class NotesService extends AbstraitService<Note> {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {
    super(noteRepository)
  }

  create(createNoteDto: CreateNoteDto) {
    const note = this.noteRepository.create(createNoteDto)
    return this.noteRepository.save(note)
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`
  }

  remove(id: number) {
    return `This action removes a #${id} note`
  }
}
