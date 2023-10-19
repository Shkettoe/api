import { Test, TestingModule } from '@nestjs/testing';
import { UserNoteSettingsController } from './user-note-settings.controller';
import { UserNoteSettingsService } from './user-note-settings.service';

describe('UserNoteSettingsController', () => {
  let controller: UserNoteSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserNoteSettingsController],
      providers: [UserNoteSettingsService],
    }).compile();

    controller = module.get<UserNoteSettingsController>(UserNoteSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
