import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/current_user.decorator'
import { User } from 'src/users/entities/user.entity'
import { Note } from './entities/note.entity'
import { AuthGuard } from '@nestjs/passport'

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @CurrentUser() user: User,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    createNoteDto.user = user
    return this.notesService.create(createNoteDto).catch(({ message }) => {
      throw new BadRequestException('something went wrong', message)
    })
  }

  @Get()
  findAll(): Promise<Note[]> {
    return this.notesService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number): Promise<Note> {
    return this.notesService.findOne(id).catch(({ message }) => {
      throw new NotFoundException(message)
    })
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.notesService.update(+id, updateNoteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notesService.remove(+id);
  // }
}
