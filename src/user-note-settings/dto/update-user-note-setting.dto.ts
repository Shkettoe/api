import { PartialType } from '@nestjs/mapped-types';
import { CreateUserNoteSettingDto } from './create-user-note-setting.dto';

export class UpdateUserNoteSettingDto extends PartialType(CreateUserNoteSettingDto) {}
