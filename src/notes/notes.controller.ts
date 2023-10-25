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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  @ApiResponse({
    description: 'Single Note',
  })
  @ApiOperation({
    description: 'Creates a new Note with the information from the Body',
    summary: 'creates new note',
  })
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
  @ApiResponse({
    description: 'Array of Notes',
  })
  @ApiOperation({
    description: 'Retrieves all the Notes from the database',
    summary: 'gets all notes',
  })
  findAll(): Promise<Note[]> {
    return this.notesService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    description: 'Single Note',
  })
  @ApiOperation({
    description: 'Retrieves a Note with an :id from the database',
    summary: 'gets note with an :id',
  })
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
