import { Test, TestingModule } from '@nestjs/testing';
import { UserNoteSettingsService } from './user-note-settings.service';

describe('UserNoteSettingsService', () => {
  let service: UserNoteSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNoteSettingsService],
    }).compile();

    service = module.get<UserNoteSettingsService>(UserNoteSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
